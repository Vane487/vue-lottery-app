<script setup lang="ts">
import type { User } from '@/entities/user'
import { AppButton, AppTable, type AppTableColumn } from '@/shared/ui'

const columns: AppTableColumn[] = [
  { key: 'image', header: 'Фото' },
  { key: 'name', header: "Ім'я" },
  { key: 'email', header: 'E-mail', field: 'email' },
  { key: 'username', header: 'Username', field: 'username' },
  { key: 'actions', header: 'Дії' },
]

defineProps<{
  users: User[]
  loading: boolean
}>()

const emit = defineEmits<{
  remove: [id: number]
}>()
</script>

<template>
  <AppTable :value="users" :loading="loading" :columns="columns">
    <template #body-image="{ data }">
      <img class="avatar" :src="data.image" :alt="data.firstName" />
    </template>

    <template #body-name="{ data }">
      {{ data.firstName }} {{ data.lastName }}
    </template>

    <template #body-actions="{ data }">
      <div class="actions">
        <RouterLink class="table-link" :to="{ name: 'user-details', params: { id: data.id } }">Деталі</RouterLink>
        <AppButton label="Видалити" severity="danger" outlined size="small" @click="emit('remove', data.id)" />
      </div>
    </template>
  </AppTable>

  <p v-if="!loading && !users.length" class="message">Користувачів не знайдено.</p>
</template>

<style scoped>
.avatar {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 50%;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.table-link {
  color: #2563eb;
  font-weight: 600;
}
</style>
