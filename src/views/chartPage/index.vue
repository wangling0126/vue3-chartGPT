<template>
  <div class="chart-page">
    <ChartContent
      v-for="(item, index) in answerList"
      :key="index"
      :item="item"
      @updateContent="(value) => (item.content = value)"
      @submit="submitChart"
    >
    </ChartContent>
    <el-button
      @click="addChart"
      class="add-chat"
      color="#343541"
      v-if="showAddBtn"
      >添加chat</el-button
    >
    <el-divider></el-divider>
    <div class="button-box">
      <el-button
        type="primary"
        @click="handleDownloadMarkdown"
        :loading="loading"
        >下载markdown文档</el-button
      >
      <el-button type="primary" @click="submitChart" :loading="loading"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'ChartPage' }
</script>

<script setup lang="ts">
import { getChatCompletionStream } from '@/api/chat'
import { useGlobalStore } from '@/stores/global'
import {
  chatToMarkdown,
  downloadMarkdown,
  parseEventSource
} from '@/utils/helper'
import { computed, ref, watch } from 'vue'
import ChartContent from './ChartContent.vue'
import { limitMessageTokens } from '@/utils/maxTokenLimit'
import { ElMessage } from 'element-plus'
const globalStore = useGlobalStore()

const answerList = computed(() => {
  return globalStore.chats[globalStore.currentChatIndex].messages
})

const showAddBtn = computed(() => {
  const lastItem = answerList.value[answerList.value.length - 1]
  return  lastItem.content
})

const addChart = () => {
  globalStore.addChatItem({
    role: 'user',
    content: ''
  })
}

const handleDownloadMarkdown = async () => {
  const currentChat = globalStore.chats[globalStore.currentChatIndex]
  let markdownStr = chatToMarkdown(currentChat)
  await downloadMarkdown(markdownStr, currentChat.title + '.md')
}

const loading = ref(false)
const submitChart = async () => {
  if (loading.value) {
    return
  }
  const messages = limitMessageTokens(answerList.value, 4000)
  const stream = await getChatCompletionStream(
    messages,
    globalStore.chats[globalStore.currentChatIndex].config
  )
  if (stream?.locked) {
    throw new Error('Oops, the stream is locked right now. Please try again')
  }

  if (stream) {
    globalStore.addChatItem({
      role: 'assistant',
      content: ''
    })
    const reader = stream.getReader()
    loading.value = true
    while (loading.value) {
      const { done, value } = await reader.read()
      const result = parseEventSource(new TextDecoder().decode(value))
      if (result === '[DONE]' || done) {
        loading.value = false
      } else {
        const resultString = result.reduce((output: string, curr) => {
          if (typeof curr === 'string') return output
          else {
            const content = curr.choices[0].delta.content
            if (content) output += content
            return output
          }
        }, '')
        const messagesList =
          globalStore.chats[globalStore.currentChatIndex].messages
        const len = messagesList.length
        const originContent = messagesList[len - 1].content
        // 更新content值
        globalStore.setChatItem(
          { content: originContent + resultString },
          len - 1
        )
      }
    }
  }
}

// 添加角色训练师
watch(() => globalStore.currentRole,newVal => {
  if (!newVal) {
    return
  }
  // 判断当前message role是否是user,是user就添加到user的前面
  const lastItem = answerList.value[answerList.value.length - 1]
  if (lastItem.role === 'user') {
    if (lastItem.content) {
      globalStore.addChatItem({
      role: 'user',
      content: newVal
    }, answerList.value.length - 1)
    } else {
      globalStore.setChatItem({
        content: newVal
      }, answerList.value.length - 1)
    }
    
  } else {
    globalStore.addChatItem({
      role: 'user',
      content: newVal
    })
  }
})
</script>

<style scoped lang="scss">
.chart-page {
  width: 100%;
  :deep(.el-textarea__inner) {
    background: transparent;
    color: #fff;
  }
}
.button-box {
  display: flex;
  justify-content: center;
}
.add-chat {
  border: 1px dashed #8f8a8a;
  padding: 18px 0;
  margin-left: 50px;
  width: calc(100% - 50px);
  box-sizing: border-box;
}
</style>
