import { getRemainingSumApi } from '@/api/globals'
import { defineStore } from 'pinia'

export const useBaseInfoStore = defineStore('baseInfo', {
  state: () => {
    return {
      moneyDetail: {
        total_available: 0,
        total_granted: 0,
        total_used: 0
      }
    }
  },
  actions: {
    async getMoenyInfo() {
      const res = await getRemainingSumApi()
      const { total_used, total_granted,  total_available } = res
      Object.assign(this.moneyDetail, {
        total_used, total_granted,  total_available
      }) 
    }
  }
})
