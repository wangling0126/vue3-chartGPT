import { request } from './request'

export const getModelsApi = () => {
  return request('/models', {
    method: 'GET'
  })
}
