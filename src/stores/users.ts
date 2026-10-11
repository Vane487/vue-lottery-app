import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ServiceProvider } from '@/services/service-provider'
import type { CreateUserDto, UpdateUserDto, User } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref('')
  let lastRequest = ''

  async function load(page: number, query: string): Promise<void> {
    const request = `${page}:${query}`
    if (request === lastRequest && users.value.length) return

    loading.value = true
    error.value = ''
    try {
      const result = await ServiceProvider.users.getAll({ limit: 10, skip: (page - 1) * 10, query })
      users.value = result.items
      total.value = result.total
      lastRequest = request
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : 'Не вдалося завантажити користувачів.'
    } finally {
      loading.value = false
    }
  }

  async function create(data: CreateUserDto): Promise<User> {
    const created = await ServiceProvider.users.create(data)
    users.value.unshift(created)
    total.value += 1
    return created
  }

  async function update(id: number, data: UpdateUserDto): Promise<User> {
    const updated = await ServiceProvider.users.update(id, data)
    const index = users.value.findIndex((user) => user.id === id)
    if (index !== -1) users.value[index] = { ...users.value[index], ...updated }
    return updated
  }

  async function remove(id: number): Promise<void> {
    await ServiceProvider.users.delete(id)
    users.value = users.value.filter((user) => user.id !== id)
    total.value = Math.max(0, total.value - 1)
  }

  return { users, total, loading, error, load, create, update, remove }
})
