import piniaPersistConfig from '@/config/piniaPersist'
import { Chat, GlobalState, CharContentItem } from '@/types/chart'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => {
    return {
      gptData: {
        chats: [],
        currentChatIndex: 0,
        apiEndpoint: '',
        apiFree: '',
        apiKey: ''
      }
    }
  },
  actions: {
    addChats(data: Chat) {
      this.gptData.chats.unshift(data)
      this.gptData.currentChatIndex = 0
    },
    changeCurrentChatIndex(index: number) {
      this.gptData.currentChatIndex = index
    },
    addChatItem(chatItem: CharContentItem) {
      this.gptData.chats[this.currentChatIndex].messages.push(chatItem)
    },
    setChatItem(chatItem: Partial<CharContentItem>, index: number) {
      Object.assign(
        this.gptData.chats[this.currentChatIndex].messages[index],
        chatItem
      )
    }
  },
  getters: {
    chats: (state) => state.gptData.chats,
    currentChatIndex: (state) => state.gptData.currentChatIndex
  },
  persist: piniaPersistConfig('gptData')
})
