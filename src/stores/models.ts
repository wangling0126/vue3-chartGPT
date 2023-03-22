import { LStorage } from '@/utils/storage'
import { getModelsApi } from './../api/model'
import { ModelItem, ModelStore } from './../types/models'
import { defineStore } from 'pinia'

export const useModelsStore = defineStore('models', {
  state: (): ModelStore => {
    return {
      modelList: [],
      currentModel: ''
    }
  },
  actions: {
    getModels() {
      if (!LStorage.get('token')) {
        return
      }
      getModelsApi().then((res) => {
        const data = res?.data || []
        if (!data.length) {
          return
        }
        this.modelList = data
        this.modelList = data
        const hasgtpTrubo = data.find(
          (item: ModelItem) => item.id === 'gpt-3.5-turbo'
        )
        this.currentModel = hasgtpTrubo ? `gpt-3.5-turbo` : data[0].id
      })
    },
    setCurrentModel(model: string) {
      this.currentModel = model
    }
  }
})
