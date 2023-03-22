<template>
  <div>
    <svg-icon icon="setting" @click="openDrawer" class="icon-common"></svg-icon>
    <el-drawer v-model="drawer" title="全局配置">
      <div class="setting-item">
        <div class="title">model</div>
        <div class="content">
          <el-select
            v-model="currentModel"
            class="m-2"
            placeholder="Select"
            @change="handleModelChange"
            filterable
          >
            <el-option
              v-for="item in modelStore.modelList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default { name: 'SettingComp' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModelsStore } from '@/stores/models'
const drawer = ref(false)
const openDrawer = () => {
  drawer.value = true
}

// model
const modelStore = useModelsStore()
const currentModel = ref('')
watch(
  () => modelStore.currentModel,
  (newVal) => {
    currentModel.value = newVal
  },
  {
    immediate: true
  }
)
const handleModelChange = () => {
  modelStore.setCurrentModel(currentModel.value)
}
</script>

<style scoped lang="scss">
.icon-common {
  font-size: 16px;
  cursor: pointer;
}
.setting-item {
  display: flex;
  justify-content: space-between;
}
</style>
