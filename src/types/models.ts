export interface ModelItemPermission {
  id: string
  object: string
  created: number
  allow_create_engine: boolean
  allow_sampling: boolean
  allow_logprobs: boolean
  allow_search_indices: boolean
  allow_view: boolean
  allow_fine_tuning: boolean
  organization: string
  group: null
  is_blocking: boolean
}
export interface ModelItem {
  created: number
  id: string
  object: string
  owned_by: string
  parent: unknown
  root: string
  permission: ModelItemPermission[]
}

export interface ModelStore {
  modelList: ModelItem[]
  currentModel: string
}
