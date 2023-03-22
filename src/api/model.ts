import { request } from './request'

export const getModelsApi = () => {
  return request('/v1/models', {
    method: 'GET'
  })
}
