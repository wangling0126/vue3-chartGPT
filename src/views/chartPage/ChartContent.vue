<template>
  <div>
    <!--v-if="index === answerList.length - 1 || answerList.length === 1"  -->
    <el-input
      v-model="content"
      :rows="2"
      type="textarea"
      placeholder="Please input"
      style="width: 100%"
      v-if="item.role === 'user'"
    ></el-input>
    <Viewer v-else v-model="content" />
  </div>
</template>

<script lang="ts">
export default { name: 'ChartContent' }
</script>

<script setup lang="ts">
import { CharContentItem } from '@/types/chart'
// import WangEditor from '@/components/WangEditer/index.vue'
import Viewer from '@/components/ToastUiEditor/Viewer.vue'
import { computed } from 'vue'
const props = defineProps<{
  item: CharContentItem
}>()
const emits = defineEmits(['updateContent'])
const content = computed({
  get() {
    return props.item.content
  },
  set(newVal) {
    emits('updateContent', newVal)
  }
})
</script>
<style scoped lang="scss"></style>
