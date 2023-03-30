<template>
  <div class="navbar">
    <div class="left">
      <el-tag class="current-model" size="large"
        >当前模型：<el-select v-model="selectedModel" @change="changeModel" filterable>
        <el-option v-for="item in modelStore.modelList" :key="item.id" :value="item.id" :label="item.id"></el-option>
      </el-select></el-tag
      >
      <el-tag class="current-model" type="warning" size="large"
        >扮演角色<el-select v-model="currentRole" filterable @change="changeRole">
        <el-option v-for="item in promptList" :key="item.act" :value="item.prompt" :label="item.act"></el-option>
      </el-select></el-tag
      >
      <el-tag class="current-model" type="success" size="large"
        >总的金额：${{ moneyDetail.total_granted }}</el-tag
      >
      <el-tag class="current-model" type="warning" size="large"
        >使用金额：${{ moneyDetail.total_used }}</el-tag
      >
      <el-tag class="current-model" size="large"
        >剩余金额：${{ moneyDetail.total_available }}</el-tag
      >
    </div>
    <div class="right">
      <setting />
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'NavBar' }
</script>

<script setup lang="ts">
import { useModelsStore } from '@/stores/models'
import { useBaseInfoStore } from '@/stores/baseInfo';
import setting from './components/setting/index.vue'
import { promptList } from '@/config/promptList'
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from '@/stores/global';
// 获取模型
const modelStore = useModelsStore()
modelStore.getModels()

const selectedModel = ref('')
watch(() => modelStore.currentModel, newVal => {
  selectedModel.value = newVal
})
const changeModel = () => {
  modelStore.setCurrentModel(selectedModel.value)
}

// 扮演角色
const currentRole = ref('')
const globalStore = useGlobalStore()
const changeRole = () => {
  globalStore.updateCurrentRole(currentRole.value)
}
// 获取余额
const baseInfoStore = useBaseInfoStore()
baseInfoStore.getMoenyInfo()
const moneyDetail = computed(() => {
  return baseInfoStore.moneyDetail
})
</script>
<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
}
</style>
