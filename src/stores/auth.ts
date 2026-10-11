import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ServiceProvider } from '@/services/service-provider'
import type { AuthSession, User } from '@/types/user'

const accessTokenKey = 'lottery-access-token'
const refreshTokenKey = 'lottery-refresh-token'
const userKey = 'lottery-auth-user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem(accessTokenKey) ?? '')
  const refreshToken = ref(localStorage.getItem(refreshTokenKey) ?? '')
  const user = ref<User | null>(readUser())
  const isAuthenticated = computed(() => Boolean(accessToken.value))

  function readUser(): User | null {
    const saved = localStorage.getItem(userKey)
    if (!saved) return null

    try {
      return JSON.parse(saved) as User
    } catch {
      return null
    }
  }

  function saveSession(session: AuthSession): void {
    accessToken.value = session.accessToken
    refreshToken.value = session.refreshToken
    user.value = {
      id: session.id,
      firstName: session.firstName,
      lastName: session.lastName,
      username: session.username,
      email: session.email,
      age: 0,
      gender: '',
      phone: '',
      image: session.image,
    }
    localStorage.setItem(accessTokenKey, accessToken.value)
    localStorage.setItem(refreshTokenKey, refreshToken.value)
    localStorage.setItem(userKey, JSON.stringify(user.value))
  }

  async function login(username: string, password: string): Promise<void> {
    const session = await ServiceProvider.auth.login(username, password)
    saveSession(session)
  }

  async function refreshAccessToken(): Promise<string | null> {
    if (!refreshToken.value) return null

    try {
      const session = await ServiceProvider.auth.refresh(refreshToken.value)
      accessToken.value = session.accessToken
      refreshToken.value = session.refreshToken
      localStorage.setItem(accessTokenKey, accessToken.value)
      localStorage.setItem(refreshTokenKey, refreshToken.value)
      return accessToken.value
    } catch {
      logout()
      return null
    }
  }

  function logout(): void {
    accessToken.value = ''
    refreshToken.value = ''
    user.value = null
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
    localStorage.removeItem(userKey)
  }

  return { accessToken, user, isAuthenticated, login, logout, refreshAccessToken }
})
