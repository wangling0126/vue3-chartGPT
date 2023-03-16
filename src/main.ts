import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import regGlobalComponent from './components/common/regGlobalComponent'
import './style.css'
import App from './App.vue'
const app = createApp(App)
app.use(regGlobalComponent)

app.mount('#app')
