<template>
  <div class="chart-page">
    <div v-for="(item, index) in answerList" :key="index">
      <el-input
        v-model="item.content"
        type="textarea"
        placeholder="Please input"
        style="width: 100%"
        v-if="index === answerList.length - 1 || answerList.length === 1"
      ></el-input>
      <VueMarkdown :source="`aaa`"></VueMarkdown>
    </div>
    <el-button type="primary" @click="submitChart">提交</el-button>
  </div>
</template>

<script lang="ts">
export default { name: 'ChartPage' }
</script>

<script setup lang="ts">
import { getChatCompletion } from '@/api/chat'
import { useGlobalStore } from '@/stores/global'
import { computed } from 'vue'
import VueMarkdown from 'vue-markdown'
const globalStore = useGlobalStore()

const answerList = computed(() => {
  return globalStore.chats[globalStore.currentChatIndex].messages
})

const submitChart = async () => {
  const res = await getChatCompletion(
    'https://api.openai.com/v1/chat/completions',
    answerList.value,
    globalStore.chats[globalStore.currentChatIndex].config
  )
  console.log(res)
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
