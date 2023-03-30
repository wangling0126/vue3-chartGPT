<template>
  <div>
    <AddChatCommon
      title="增加聊天"
      @add-chat="addChart"
      @toggle-fold="toggleFold"
    />
    <div ref="chatWrap" style="overflow: hidden" class="chatWrap">
      <div class="chart-list" ref="chatList">
        <ChatItemCommon
          v-for="(item, index) in globalStore.chats"
          :key="item.title"
          :title="item.title"
          :class="{ active: globalStore.currentChatIndex === index }"
          @change-active="changeActive(index)"
          @handleDelete="handleDelete(index)"
          @updateTitle="(newTitle) => handleUpdateTitle(title, index, newTitle)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'SidebarCom' }
</script>

<script setup lang="ts">
import AddChatCommon from './components/AddChatCommon.vue'
import { Chat } from '@/types/chart'
import { useGlobalStore } from '@/stores/global'
import { Ref, ref } from 'vue'
import ChatItemCommon from './components/ChatItemCommon.vue'
import { ElMessage } from 'element-plus'
const globalStore = useGlobalStore()
const getInitChart = (): Chat => {
  const messages = [
      {
        role: 'user',
        content: ''
      }
    ]
  return {
    title: '1',
    messages: messages,
    config: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 1,
      top_p: 1
    }
  }
}


const addChart = () => {
  let titleIndex = 1
  let title = `新页面 ${titleIndex}`
  while (globalStore.chats.some((chat) => chat.title === title)) {
    titleIndex += 1
    title = `新页面 ${titleIndex}`
  }
  globalStore.updateCurrentRole('')
  globalStore.addChats({
    ...getInitChart(),
    title: title
  })
}
if (!globalStore.chats.length) {
  addChart()
}

const changeActive = (index: number) => {
  globalStore.updateCurrentRole('')
  globalStore.changeCurrentChatIndex(index)
}

const chatWrap = ref<HTMLElement | null>(null)
const chatList = ref<HTMLElement | null>(null)
const toggleFold = (isFold: boolean) => {
  if (!chatWrap.value) {
    return
  }
  chatWrap.value.style.maxHeight = isFold ? '0px' : ''
}

const handleDelete = (index: number) => {
  globalStore.deleteChatItem(index)
}
const handleUpdateTitle = (
  originTitle: string,
  index: number,
  title: string
) => {
  if (originTitle === title) {
    globalStore.editChatTitle(index, title)
    return
  }
  const allTitles = globalStore.chats.map((item: Chat) => item.title)
  if (allTitles.includes(title)) {
    ElMessage.error('title重复了，请检查')
    return
  }
  globalStore.editChatTitle(index, title)
}
</script>
<style scoped lang="scss"></style>
