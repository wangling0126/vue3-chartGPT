<template>
  <div class="main-container">
    <!-- <ChartPage /> -->
    <RouterView></RouterView>
    <SetApiKeyDialog v-model:visible="visible" />
  </div>
</template>

<script lang="ts">
export default { name: 'MainComp' }
</script>

<script setup lang="ts">
import { LStorage } from '@/utils/storage'
// import ChartPage from '@/views/chartPage/index.vue'
import SetApiKeyDialog from '@/views/SetApiKeyDialog/index.vue'
import { ref } from 'vue'

const visible = ref(false)
const token = LStorage.get('token')
if (!token) {
  visible.value = true
}
</script>
<style scoped lang="scss"></style>
