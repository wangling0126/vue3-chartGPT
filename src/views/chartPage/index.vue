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
import { getChatCompletion } from '@/api/chat'
import { useGlobalStore } from '@/stores/global'
import { computed } from 'vue'
import ChartContent from './ChartContent.vue'
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
