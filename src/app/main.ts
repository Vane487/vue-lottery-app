import { createApp } from 'vue'
import App from './App.vue'
import router from './providers/router'
import './styles/main.scss'
import { configureHttpAuth } from '@/shared/api'
import { useSessionStore } from '@/entities/session'
import { registerServices } from './providers/services'
import { pinia } from './providers/pinia'

const app = createApp(App)

registerServices()
app.use(pinia)
app.use(router)

const session = useSessionStore(pinia)
configureHttpAuth(
  () => session.accessToken || null,
  () => session.refreshAccessToken(),
)

app.mount('#app')
