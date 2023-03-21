<template>
  <div class="chart-page">
    <ChartContent
      v-for="(item, index) in answerList"
      :key="index"
      :item="item"
      @updateContent="(value) => (item.content = value)"
    >
    </ChartContent>
    <el-button type="primary" @click="submitChart">提交</el-button>
  </div>
</template>

<script lang="ts">
export default { name: 'ChartPage' }
</script>

<script setup lang="ts">
import { getChatCompletionStream } from '@/api/chat'
import { useGlobalStore } from '@/stores/global'
import { parseEventSource } from '@/utils/helper'
import { computed } from 'vue'
import ChartContent from './ChartContent.vue'
import { limitMessageTokens } from '@/utils/maxTokenLimit'
const globalStore = useGlobalStore()

const answerList = computed(() => {
  return globalStore.chats[globalStore.currentChatIndex].messages
})

const submitChart = async () => {
  const messages = limitMessageTokens(
    answerList.value,
        4000
      );
  const stream = await getChatCompletionStream(
    'https://api.openai.com/v1/chat/completions',
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
    let reading = true
    while (reading) {
      const { done, value } = await reader.read()
      const result = parseEventSource(new TextDecoder().decode(value))
      if (result === '[DONE]' || done) {
        reading = false
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
</script>

<style scoped lang="scss">
.chart-page {
  width: 100%;
  :deep(.el-textarea__inner) {
    background: transparent;
    color: #fff;
  }
}
</style>
