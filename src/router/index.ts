import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from '@/views/chartPage/index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/chat'
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatPage
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
