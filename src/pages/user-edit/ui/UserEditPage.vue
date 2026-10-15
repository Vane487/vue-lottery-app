<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { UserForm } from '@/features/user-form'
import { useUsersStore, type CreateUserDto, type User } from '@/entities/user'
import { useAppToast } from '@/shared/ui'

const props = defineProps<{ id: string }>()
const router = useRouter()
const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const user = ref<User | null>(users.value.find((item) => item.id === Number(props.id)) ?? null)
const loading = ref(!user.value)
const error = ref('')
const toast = useAppToast()

onMounted(async () => {
  if (user.value) return

  try {
    user.value = await usersStore.fetchUser(Number(props.id))
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося завантажити користувача.'
  } finally {
    loading.value = false
  }
})

async function updateUser(values: CreateUserDto): Promise<void> {
  error.value = ''
  try {
    await usersStore.updateUser(Number(props.id), values)
    toast.success('Дані користувача оновлено.')
    await router.push({ name: 'users' })
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося оновити користувача.'
  }
}
</script>

<template>
  <p v-if="loading" class="message">Завантаження…</p>
  <section v-else class="panel">
    <h1>Редагувати користувача</h1>
    <p class="muted">Після PUT відповіді замінюємо користувача у локальному Pinia store.</p>
    <p v-if="error" class="message message--error">{{ error }}</p>
    <UserForm v-if="user" :user="user" submit-label="Оновити" @save="updateUser" />
  </section>
</template>
