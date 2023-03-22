<template>
  <div class="add-chart" @click="addChat">
    <svg-icon icon="add" color="white" class="icon-common"></svg-icon>
    <span>{{ title }}</span>
    <div class="icon-box" @click.stop="toggleStatus">
      <svg-icon
        icon="allow_down"
        class="allow-common"
        :class="{ unfold: !isFold }"
      ></svg-icon>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'AddChatCommon' }
</script>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const emits = defineEmits(['addChat', 'toggleFold'])

const addChat = () => {
  emits('addChat')
  if (isFold.value) {
    toggleStatus()
  }
}

const isFold = ref(false)
const toggleStatus = () => {
  isFold.value = !isFold.value
  emits('toggleFold', isFold.value)
}
</script>
<style scoped lang="scss">
.add-chart {
  border: 1px solid rgb(255 255 255 / 0.2);
  padding: 10px;
  border-radius: 4px;
  background: transparent;
  transition: all 0.5s;
  position: relative;
  cursor: pointer;
  // &:hover {
  //   background-color: #343541;
  // }
}
.icon-box {
  position: absolute;
  right: 0;
  top: 0;
  // background: #343541;
  height: 100%;
  width: 40px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #343541;
  }
  .allow-common {
    font-size: 20px;
    transition: all 0.5s;
  }
  .allow-common.unfold {
    transform: rotate(180deg);
  }
}
.icon-common {
  margin-right: 8px;
  font-size: 16px;
}
</style>
