const baseUrl = ``

export function request(url: string, options: RequestInit): Promise<any> {
  // 在请求头中加入token
  const token = localStorage.getItem('token')
  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // 在发起请求之前做一些处理
  // ...

  return fetch(baseUrl + url, { ...options, headers })
    .then((response) => {
      if (response.ok) {
        // 在处理响应之后做一些处理
        // ...
        return response.json()
      } else {
        throw new Error('Network response was not ok.')
      }
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}
