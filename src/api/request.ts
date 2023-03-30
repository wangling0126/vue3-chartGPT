import { LStorage } from '@/utils/storage'

export const baseUrl = `https://api.openai.com`

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

  return new Promise((resolve, rejected) => {
    fetch(baseUrl + url, { ...options, headers }).then(async (response) => {
      const responseCopy = response.clone()
      if (response.ok) {
        resolve(response.json())
      } else {
        responseCopy.json().then((err) => {
          ElMessage.error(err.error.message || '请求错误了')
          rejected(err)
        })
      }
    })
  })
}
