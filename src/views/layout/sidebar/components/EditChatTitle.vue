<template>
  <el-dialog v-model="innerVisible" title="修改标题" width="50%" append-to-body>
    <el-input v-model="title" placeholder="修改标题"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="innerVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSure"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'EditChatTitle' }
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String
  }
})
const emit = defineEmits(['update:visible', 'handleSure'])
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})
const title = ref('')

watch(
  () => props.title,
  (newVal) => {
    title.value = newVal || ''
  },
  {
    immediate: true
  }
)
const handleSure = () => {
  emit('handleSure', title.value)
}
</script>

<style scoped></style>
