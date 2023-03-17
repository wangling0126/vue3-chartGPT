import { LStorage } from '@/utils/storage'

const baseUrl = ``

export const request = (
  url: string,
  options: RequestInit,
  useApiKey = true
): Promise<any> => {
  // 在请求头中加入token
  const token = LStorage.get('token')
  const headers = new Headers(options.headers)
  if (token && useApiKey) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  options.headers = options.headers
    ? { ...options.headers, ...headers }
    : headers
  // 在发起请求之前做一些处理
  // ...

  return fetch(baseUrl + url, { ...options, headers })
    .then(async (response) => {
      if (response.ok) {
        // 在处理响应之后做一些处理
        // ...
        return response.json()
      } else {
        throw new Error(await response.text())
      }
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}
