<template>
  <el-dialog
    v-model="innerVisible"
    title="设置apikey"
    width="50%"
    append-to-body
  >
    <el-input v-model="apikey" placeholder="请输入apikey"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="innerVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSure"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'SetApiKeyDialog' }
</script>

<script setup lang="ts">
import { LStorage } from '@/utils/storage'
import { computed, ref } from 'vue'
import { useModelsStore } from '@/stores/models'
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:visible', 'onSuccess'])
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const apikey = ref(LStorage.get('token') || '')
const handleSure = () => {
  LStorage.set('token', apikey.value)
  useModelsStore().getModels()
  innerVisible.value = false
  emit('onSuccess')
}
</script>

<style scoped></style>
