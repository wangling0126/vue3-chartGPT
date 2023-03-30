<template>
  <div class="chart-item" @click="changeActive">
    <svg-icon icon="page" color="white" class="icon-common"></svg-icon>
    <div class="title">{{ title }}</div>
    <div class="opration-box">
      <svg-icon
        icon="edit"
        class="icon-common"
        color="#a79e9e"
        @click.stop="handleEdit"
      ></svg-icon>
      <svg-icon
        v-if="chatLen > 1"
        icon="delete"
        class="icon-common"
        color="#a79e9e"
        @click.stop="handleDelete"
      ></svg-icon>
    </div>
    <EditChatTitle
      v-model:visible="visible"
      :title="title"
      @handle-sure="handleSure"
    />
  </div>
</template>

<script lang="ts">
export default { name: 'ChatItemCommon' }
</script>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { computed, ref } from 'vue'
import EditChatTitle from './EditChatTitle.vue'
defineProps<{
  title: string
}>()

const emits = defineEmits(['changeActive', 'updateTitle', 'handleDelete'])
const chatLen = computed(() => {
  return useGlobalStore().chats.length
})
const changeActive = () => {
  emits('changeActive')
}

const visible = ref(false)
const handleEdit = () => {
  // emits('handleEdit')
  visible.value = true
}
const handleSure = (title: string) => {
  emits('updateTitle', title)
}
const handleDelete = () => {
  emits('handleDelete')
}
</script>
<style scoped lang="scss">
.chart-item {
  padding: 10px 70px 10px 10px;
  border-radius: 4px;
  background: transparent;
  transition: all 0.5s;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background-color: #343541;
    .opration-box {
      display: block;
    }
  }
}
.active {
  background-color: #343541;
}
.icon-common {
  margin-right: 8px;
  font-size: 16px;
}
.title {
  flex: 1;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.opration-box {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  .icon-common {
    &:hover {
      fill: #fff;
    }
  }
}
</style>
