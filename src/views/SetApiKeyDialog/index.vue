<template>
  <el-dialog v-model="innerVisible" title="设置apikey" width="50%">
    <el-input
      v-model="apikey"
      placeholder="请输入apikey"
      @change="saveApiKey"
    ></el-input>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'SetApiKeyDialog' }
</script>

<script setup lang="ts">
import { LStorage } from '@/utils/storage'
import { computed, ref } from 'vue'

const props = defineProps({
  visible: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:visible'])
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const apikey = ref('')
const saveApiKey = () => {
  localStorage.setItem('token', apikey.value)
}
</script>

<style scoped></style>
