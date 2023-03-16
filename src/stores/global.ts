import piniaPersistConfig from '@/config/piniaPersist'
import { defineStore } from 'pinia'
export interface Chat {
  title: string
  messages: { role: string; content: string }[]
  config: {
    frequency_penalty: number
    presence_penalty: number
    temperature: number
    top_p: number
  }
}

export interface GlobalState {
  gptData: {
    chats: Chat[]
    currentChatIndex: number
    apiEndpoint: string
    apiFree: string
    apiKey: string
  }
}

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
    }
  },
  getters: {
    chats: (state) => state.gptData.chats,
    currentChatIndex: (state) => state.gptData.currentChatIndex
  },
  persist: piniaPersistConfig('gptData')
})
