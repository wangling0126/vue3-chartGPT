<template>
  <div class="sidebar">
    <AddChats />
  </div>
</template>

<script lang="ts">
export default { name: 'SidebarCom' }
</script>

<script setup lang="ts">
import AddChats from './AddChats.vue'
</script>
<style scoped lang="scss">
.sidebar {
  color: #fff;
}
.add-chart {
  border: 1px solid rgb(255 255 255 / 0.2);
  padding: 10px;
  border-radius: 4px;
  background: transparent;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #343541;
  }
}
.icon-common {
  margin-right: 8px;
  font-size: 16px;
}
.chart-list {
  margin-top: 10px;
}
.chart-item {
  padding: 10px;
  border-radius: 4px;
  background: transparent;
  transition: all 0.5s;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #343541;
  }
}
.active {
  background-color: #343541;
}
</style>
