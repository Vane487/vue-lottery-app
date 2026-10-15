<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserForm } from '@/features/user-form'
import { useUsersStore, type CreateUserDto } from '@/entities/user'
import { useAppToast } from '@/shared/ui'

const router = useRouter()
const usersStore = useUsersStore()
const error = ref('')
const toast = useAppToast()

async function createUser(values: CreateUserDto): Promise<void> {
  error.value = ''
  try {
    await usersStore.createUser(values)
    toast.success('Користувача додано до списку.')
    await router.push({ name: 'users' })
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося створити користувача.'
  }
}
</script>

<template>
  <section class="panel">
    <h1>Додати користувача</h1>
    <p class="muted">Після відповіді API нового користувача додаємо у Pinia store.</p>
    <p v-if="error" class="message message--error">{{ error }}</p>
    <UserForm @save="createUser" />
  </section>
</template>
