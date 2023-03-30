<template>
  <div>
    <!--v-if="index === answerList.length - 1 || answerList.length === 1"  -->
    <div v-if="item.role === 'user'" class="chart-input-box">
      <div class="icon" style="background-color: rgb(16, 163, 127)">
        <svg-icon icon="assistantIcon" color="white"></svg-icon>
      </div>
      <el-input
        v-model="content"
        :rows="2"
        type="textarea"
        @keydown="handleKeyDown"
        placeholder="按ctrl + enter快捷提交"
        style="width: 100%"
      ></el-input>
    </div>
    <div v-else class="chart-input-box">
      <div class="icon" style="background-color: rgb(200, 70, 70)">
        <svg-icon icon="personIcon" color="white"></svg-icon>
      </div>
      <Viewer v-model="content" />
    </div>
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
const emits = defineEmits(['updateContent', 'submit'])
const content = computed({
  get() {
    return props.item.content
  },
  set(newVal) {
    emits('updateContent', newVal)
  }
})
const handleKeyDown = (event: KeyboardEvent) => {
  console.log(event.keyCode, event.ctrlKey)
  if (event.keyCode === 13 && (event.ctrlKey || event.metaKey)) {
    // 在这里写入你提交数据的代码
    emits('submit')
  }
}
</script>
<style scoped lang="scss">
.chart-input-box {
  display: flex;
  margin-bottom: 10px;
  .icon {
    margin-right: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 4px;
    .svg-icon {
      stroke-width: 3;
    }
  }
}
</style>
