import piniaPersistConfig from '@/config/piniaPersist'
import { Chat, GlobalState } from '@/types/chart'
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
    }
  },
  getters: {
    chats: (state) => state.gptData.chats,
    currentChatIndex: (state) => state.gptData.currentChatIndex
  },
  persist: piniaPersistConfig('gptData')
})
