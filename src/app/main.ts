import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './providers/router'
import './styles/main.scss'
import { configureHttpAuth } from '@/shared/api'
import { useAuthStore } from '@/stores/auth'
import { registerServices } from './providers/services'

const app = createApp(App)
const pinia = createPinia()

registerServices()
app.use(pinia)
app.use(router)

const auth = useAuthStore(pinia)
configureHttpAuth(
  () => auth.accessToken || null,
  () => auth.refreshAccessToken(),
)

app.mount('#app')
