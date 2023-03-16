<template>
  <div class="main-container">
    <Sidebar class="sidebar-container" />
    <div class="content">
      <Navbar class="navbar" />
      <Main class="main" />
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'LayoutComp' }
</script>

<script setup lang="ts">
import Sidebar from './sidebar/index.vue'
import Navbar from './navbar/index.vue'
import Main from './main/index.vue'
</script>
<style scoped lang="scss">
.main-container {
  display: flex;
  height: 100vh;
  color: #e3d7d7;
  .sidebar-container {
    width: 240px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgb(32, 33, 35);
    padding: 10px;
  }
  .content {
    flex: 1;
    width: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #343541;
    .navbar {
      height: 50px;
      background-color: #40414f;
      padding: 0 20px;
    }
    .main {
      flex: 1;
      overflow: auto;
      height: 0;
      padding: 20px;
    }
  }
}
</style>
