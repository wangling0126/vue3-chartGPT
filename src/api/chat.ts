import { LStorage } from '@/utils/storage'
import { Chat } from './../types/chart'
import { baseUrl, request } from './request'
import { useModelsStore } from '@/stores/models'
export const getChatCompletion = async (
  endpoint: string,
  messages: Chat['messages'],
  config: Chat['config'],
  useApiKey = true
) => {
  const response = await request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: useModelsStore().currentModel || 'gpt-3.5-turbo',
      messages,
      ...config,
      stream: true
    })
  })
  if (!response.ok) throw new Error(await response.text())

  const data = await response.json()
  return data
}

export const getChatCompletionStream = async (
  messages: Chat['messages'],
  config: Chat['config'],
  useApiKey = true
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }
  const token = LStorage.get('token')
  if (token && useApiKey) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const response = await fetch(baseUrl + '/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: useModelsStore().currentModel || 'gpt-3.5-turbo',
      messages,
      ...config,
      stream: true
    })
  })
  if (response.status === 404 || response.status === 405)
    throw new Error(
      'Message from freechatgpt.chat:\nInvalid API endpoint! We recommend you to check your free API endpoint.'
    )

  if (response.status === 429 || !response.ok) {
    const text = await response.text()
    let error = text
    if (text.includes('insufficient_quota')) {
      error +=
        '\nMessage from freechatgpt.chat:\nToo many request! We recommend changing your API endpoint or API key'
    }
    throw new Error(error)
  }

  const stream = response.body
  return stream
}
