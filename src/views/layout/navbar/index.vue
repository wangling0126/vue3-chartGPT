<template>
  <div class="navbar">
    <div class="left">
      <el-tag class="current-model" size="large"
        >当前模型：{{ modelStore.currentModel }}</el-tag
      >
      <el-tag class="current-model" type="success" size="large"
        >总的金额：{{ total_granted }}</el-tag
      >
      <el-tag class="current-model" type="warning" size="large"
        >使用金额：{{ total_used }}</el-tag
      >
      <el-tag class="current-model" size="large"
        >剩余金额：{{ total_available }}</el-tag
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
import { getRemainingSumApi } from '@/api/globals'
import { useModelsStore } from '@/stores/models'
import { ref } from 'vue'
import setting from './components/setting/index.vue'
// 获取模型
const modelStore = useModelsStore()
modelStore.getModels()

// 获取余额
const total_used = ref(0)
const total_granted = ref(0)
const total_available = ref(0)

getRemainingSumApi().then((res) => {
  total_used.value = res.total_used
  total_granted.value = res.total_granted
  total_available.value = res.total_available
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
