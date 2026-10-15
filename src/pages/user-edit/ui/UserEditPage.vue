<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import UserForm from '@/features/user-form/ui/UserForm.vue'
import { useUsersStore, type CreateUserDto, type User } from '@/entities/user'

const props = defineProps<{ id: string }>()
const router = useRouter()
const usersStore = useUsersStore()
const user = ref<User | null>(usersStore.users.find((item) => item.id === Number(props.id)) ?? null)
const loading = ref(!user.value)
const error = ref('')

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
    await router.push({ name: 'users' })
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося оновити користувача.'
  }
}
</script>

<template>
  <div v-if="loading" class="alert alert-info">Завантаження…</div>
  <section v-else class="card border-0 shadow-sm">
    <div class="card-body p-4">
      <h1 class="h3">Редагувати користувача</h1>
      <p class="text-secondary">Після PUT відповіді замінюємо користувача у локальному Pinia store.</p>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <UserForm v-if="user" :user="user" submit-label="Оновити" @save="updateUser" />
    </div>
  </section>
</template>
