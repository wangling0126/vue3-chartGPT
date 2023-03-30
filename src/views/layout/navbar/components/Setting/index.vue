<template>
  <div class="flex flex-wrap items-center">
    <el-dropdown @command="handleCommand">
      <el-button> 设置<svg-icon icon="allow_down"></svg-icon> </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="openApiKeyDialog"
            >api key设置</el-dropdown-item
          >
          <el-dropdown-item command="openApiKeyDialog"
            >更改model</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <SetApiKeyDialog
      v-model:visible="visible"
      @on-success="handleSetApiKetSuccess"
    />
  </div>
</template>

<script lang="ts">
export default { name: 'SettingComp' }
</script>

<script setup lang="ts">
import SetApiKeyDialog from '@/views/SetApiKeyDialog/index.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useModelsStore } from '@/stores/models'
//  设置api key
const visible = ref(false)
const openApiKeyDialog = () => {
  visible.value = true
}
const handleSetApiKetSuccess = () => {
  ElMessage.success('设置api key成功')
}

// 更改models模型

const handleCommand = (command: string) => {
  console.log(command)
  const funcMap = {
    openApiKeyDialog
  }
  funcMap[command as keyof typeof funcMap]?.()
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
