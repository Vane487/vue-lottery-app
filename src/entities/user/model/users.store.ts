import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ServiceProvider } from '@/shared/api'
import type { UserService } from '../api/user.service'
import type { CreateUserDto, UpdateUserDto, User } from './types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const total = ref(0)
  const isLoading = ref(false)
  const error = ref('')
  const hasUsers = computed(() => users.value.length > 0)
  let lastRequest = ''

  function service(): UserService {
    return ServiceProvider.get<UserService>('users')
  }

  async function fetchUsers({ page = 1, query = '' }: { page?: number; query?: string } = {}): Promise<void> {
    const request = `${page}:${query}`
    if (request === lastRequest && hasUsers.value) return

    isLoading.value = true
    error.value = ''
    try {
      const result = await service().getAll({ limit: 10, skip: (page - 1) * 10, query })
      users.value = result.items
      total.value = result.total
      lastRequest = request
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : 'Не вдалося завантажити користувачів.'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUser(id: number): Promise<User> {
    const saved = users.value.find((item) => item.id === id)
    if (saved) return saved

    isLoading.value = true
    error.value = ''
    try {
      return await service().getById(id)
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : 'Не вдалося знайти користувача.'
      throw reason
    } finally {
      isLoading.value = false
    }
  }

  async function createUser(data: CreateUserDto): Promise<User> {
    const created = await service().create(data)
    users.value.unshift(created)
    total.value += 1
    return created
  }

  async function updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const updated = await service().update(id, data)
    const index = users.value.findIndex((item) => item.id === id)
    if (index >= 0) users.value[index] = { ...users.value[index], ...updated }
    return updated
  }

  async function removeUser(id: number): Promise<void> {
    await service().delete(id)
    users.value = users.value.filter((item) => item.id !== id)
    total.value = Math.max(0, total.value - 1)
  }

  return {
    users,
    total,
    isLoading,
    error,
    hasUsers,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    removeUser,
  }
})
