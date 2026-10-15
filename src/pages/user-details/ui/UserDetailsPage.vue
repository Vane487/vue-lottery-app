<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUsersStore, type User } from '@/entities/user'

const props = defineProps<{ id: string }>()
const usersStore = useUsersStore()
const user = ref<User | null>(usersStore.users.find((item) => item.id === Number(props.id)) ?? null)
const loading = ref(!user.value)
const error = ref('')

onMounted(async () => {
  if (user.value) return

  try {
    user.value = await usersStore.fetchUser(Number(props.id))
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося знайти користувача.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="alert alert-info">Завантаження…</div>
  <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
  <section v-else-if="user" class="card border-0 shadow-sm">
    <div class="card-body p-4">
      <div class="d-flex gap-4 align-items-start">
        <img class="profile-image" :src="user.image" :alt="user.firstName" />
        <div>
          <h1 class="h2">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="text-secondary mb-1">{{ user.email }}</p>
          <p class="mb-1"><strong>Username:</strong> {{ user.username }}</p>
          <p class="mb-1"><strong>Вік:</strong> {{ user.age }}</p>
          <p class="mb-1"><strong>Стать:</strong> {{ user.gender }}</p>
          <p class="mb-3"><strong>Телефон:</strong> {{ user.phone }}</p>
          <RouterLink class="btn btn-primary me-2" :to="{ name: 'user-edit', params: { id: user.id } }">Редагувати</RouterLink>
          <RouterLink class="btn btn-outline-secondary" :to="{ name: 'users' }">До списку</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 1rem;
}
</style>
