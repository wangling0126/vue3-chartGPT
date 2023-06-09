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
        apiKey: '',
      },
      currentRole: ''
    }
  },
  actions: {
    updateCurrentRole(role: string) {
      this.currentRole = role
    },
    addChats(data: Chat) {
      this.gptData.chats.unshift(data)
      this.gptData.currentChatIndex = 0
    },
    changeCurrentChatIndex(index: number) {
      this.gptData.currentChatIndex = index
    },
    addChatItem(chatItem: CharContentItem, index?: number) {
      if (index) {
        this.gptData.chats[this.currentChatIndex].messages.splice(index, 0, chatItem)
      } else {
        this.gptData.chats[this.currentChatIndex].messages.push(chatItem)
      }
    },
    setChatItem(chatItem: Partial<CharContentItem>, index: number) {
      Object.assign(
        this.gptData.chats[this.currentChatIndex].messages[index],
        chatItem
      )
    },
    editChatTitle(index: number, title: string) {
      this.gptData.chats[this.currentChatIndex].title = title
    },
    deleteChatItem(index: number) {
      this.gptData.chats.splice(index, 1)
      if (index === this.currentChatIndex) {
        this.gptData.currentChatIndex = 0
      }
    }
  },
  getters: {
    chats: (state) => state.gptData.chats,
    currentChatIndex: (state) => state.gptData.currentChatIndex
  },
  persist: piniaPersistConfig('gptData')
})
