import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import regGlobalComponent from './components/common/regGlobalComponent'
import './style.css'
import App from './App.vue'
// pinia
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(createPersistedState())

const app = createApp(App)
app.use(pinia).use(regGlobalComponent)

app.mount('#app')
