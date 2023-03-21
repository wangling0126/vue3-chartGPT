export interface CharContentItem {
  role: string
  content: string
}
export interface Chat {
  title: string
  messages: CharContentItem[]
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
export interface EventSourceDataChoices {
  delta: {
    content?: string
    role?: string
  }
  finish_reason?: string
  index: number
}
export interface EventSourceDataInterface {
  choices: EventSourceDataChoices[]
  created: number
  id: string
  model: string
  object: string
}

export type EventSourceData = EventSourceDataInterface | '[DONE]'
