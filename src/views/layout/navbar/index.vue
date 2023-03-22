<template>
  <div class="navbar">
    <div class="left">
      <div class="current-model">当前模型：{{ modelStore.currentModel }}</div>
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
import setting from './components/setting.vue'
const modelStore = useModelsStore()
modelStore.getModels()
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
