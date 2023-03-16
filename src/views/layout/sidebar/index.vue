<template>
  <div class="sidebar">
    <div class="add-chart" @click="addChart">
      <svg-icon icon="add" color="white" class="icon-common"></svg-icon>
      增加聊天
    </div>
    <div class="chart-list">
      <div v-for="item in globalStore.chats" :key="item.title">
        <div>{{ item.title }}aaa</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'SidebarCom' }
</script>

<script setup lang="ts">
import { Chat } from '@/stores/global'
import { useGlobalStore } from '@/stores/global'
const getInitChart = (): Chat => {
  return {
    title: '1',
    messages: [
      {
        role: 'system',
        content: 'hello'
      }
    ],
    config: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 1,
      top_p: 1
    }
  }
}

const globalStore = useGlobalStore()

const addChart = () => {
  let titleIndex = 1
  let title = `新页面 ${titleIndex}`
  while (globalStore.chats.some((chat) => chat.title === title)) {
    titleIndex += 1
    title = `新页面 ${titleIndex}`
  }
  globalStore.addChats({
    ...getInitChart(),
    title: title
  })
}
if (!globalStore.chats.length) {
  addChart()
}
</script>
<style scoped lang="scss">
.sidebar {
  color: #fff;
}
.add-chart {
  border: 1px solid rgb(255 255 255 / 0.2);
  padding: 10px;
  border-radius: 4px;
  background: transparent;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #343541;
  }
}
.icon-common {
  margin-right: 4px;
}
</style>
