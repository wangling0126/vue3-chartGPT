import { Chat } from './../types/chart'
import { request } from './request'

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
      model: 'gpt-3.5-turbo',
      messages,
      ...config
    })
  })
  if (!response.ok) throw new Error(await response.text())

  const data = await response.json()
  return data
}
