<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useUsersStore, type User } from '@/entities/user'

const props = defineProps<{ id: string }>()
const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const user = ref<User | null>(users.value.find((item) => item.id === Number(props.id)) ?? null)
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
  <p v-if="loading" class="message">Завантаження…</p>
  <p v-else-if="error" class="message message--error">{{ error }}</p>
  <section v-else-if="user" class="panel profile">
    <img class="profile-image" :src="user.image" :alt="user.firstName" />
    <div>
      <h1>{{ user.firstName }} {{ user.lastName }}</h1>
      <p class="muted">{{ user.email }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Вік:</strong> {{ user.age }}</p>
      <p><strong>Стать:</strong> {{ user.gender }}</p>
      <p><strong>Телефон:</strong> {{ user.phone }}</p>
      <div class="profile-actions">
        <RouterLink :to="{ name: 'user-edit', params: { id: user.id } }">Редагувати</RouterLink>
        <RouterLink :to="{ name: 'users' }">До списку</RouterLink>
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

.profile {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;
}
</style>
