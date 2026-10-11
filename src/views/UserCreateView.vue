<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserForm from '@/components/UserForm.vue'
import { useUsersStore } from '@/stores/users'
import type { CreateUserDto } from '@/types/user'

const router = useRouter()
const usersStore = useUsersStore()
const error = ref('')

async function createUser(values: CreateUserDto): Promise<void> {
  error.value = ''
  try {
    await usersStore.create(values)
    await router.push({ name: 'users' })
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося створити користувача.'
  }
}
</script>

<template>
  <section class="card border-0 shadow-sm">
    <div class="card-body p-4">
      <h1 class="h3">Додати користувача</h1>
      <p class="text-secondary">Після відповіді API нового користувача додаємо у Pinia store.</p>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <UserForm @save="createUser" />
    </div>
  </section>
</template>
