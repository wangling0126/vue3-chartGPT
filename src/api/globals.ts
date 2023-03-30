// 获取账号余额信息
// export const getMoneyInfo = token => {
//   return axios({
//     method: 'get',
//     baseURL: `${baseUrl}/dashboard/billing/credit_grants`,
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json'
//     }
//   }).then(res => {
//     return res.data;
//   })
// }
import { LStorage } from '@/utils/storage'
import { baseUrl, request } from './request'

// 获取账号余额信息
export const getRemainingSumApi = () => {
  const token = LStorage.get('token')
  if (!token) {
    return
  }
  return request(`/dashboard/billing/credit_grants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
