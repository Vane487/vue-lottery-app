import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ServiceProvider } from '@/shared/api'
import type { AuthService } from '../api/auth.service'
import type { AuthSession, SessionUser } from './types'

export const useSessionStore = defineStore(
  'session',
  () => {
    const accessToken = ref('')
    const refreshToken = ref('')
    const user = ref<SessionUser | null>(null)
    const isAuthenticated = computed(() => Boolean(accessToken.value))

    function setSession(session: AuthSession): void {
      accessToken.value = session.accessToken
      refreshToken.value = session.refreshToken
      user.value = {
        id: session.id,
        firstName: session.firstName,
        lastName: session.lastName,
        username: session.username,
        email: session.email,
        image: session.image,
      }
    }

    function clearSession(): void {
      accessToken.value = ''
      refreshToken.value = ''
      user.value = null
    }

    async function login(username: string, password: string): Promise<void> {
      const session = await ServiceProvider.get<AuthService>('auth').login(username, password)
      setSession(session)
    }

    async function refreshAccessToken(): Promise<string | null> {
      if (!refreshToken.value) return null

      try {
        const session = await ServiceProvider.get<AuthService>('auth').refresh(refreshToken.value)
        accessToken.value = session.accessToken
        refreshToken.value = session.refreshToken
        return accessToken.value
      } catch {
        clearSession()
        return null
      }
    }

    return {
      accessToken,
      refreshToken,
      user,
      isAuthenticated,
      setSession,
      clearSession,
      login,
      refreshAccessToken,
    }
  },
  {
    persist: {
      key: 'vue-lottery:session',
      pick: ['accessToken', 'refreshToken', 'user'],
    },
  },
)
