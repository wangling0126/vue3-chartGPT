import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import regGlobalComponent from './components/common/regGlobalComponent'
import './styles/index.scss'
import App from './App.vue'
// pinia
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(createPersistedState())

// element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app
  .use(ElementPlus, { size: 'small', zIndex: 20000 })
  .use(pinia)
  .use(regGlobalComponent)

app.mount('#app')
