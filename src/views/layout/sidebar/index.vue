<template>
  <div class="sidebar">
    <div class="add-chart" @click="addChart">
      <svg-icon icon="add" color="white" class="icon-common"></svg-icon>
      <span>增加聊天</span>
    </div>
    <div class="chart-list">
      <div
        v-for="(item, index) in globalStore.chats"
        :key="item.title"
        class="chart-item"
        :class="{ active: globalStore.currentChatIndex === index }"
        @click="changeActive(index)"
      >
        <svg-icon icon="page" color="white" class="icon-common"></svg-icon>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'SidebarCom' }
</script>

<script setup lang="ts">
import { Chat } from '@/types/chart'
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

const changeActive = (index: number) => {
  globalStore.changeCurrentChatIndex(index)
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
  margin-right: 8px;
  font-size: 16px;
}
.chart-list {
  margin-top: 10px;
}
.chart-item {
  padding: 10px;
  border-radius: 4px;
  background: transparent;
  transition: all 0.5s;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #343541;
  }
}
.active {
  background-color: #343541;
}
</style>
