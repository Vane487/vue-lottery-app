<script setup lang="ts">
import type { User } from '@/entities/user'
import { AppButton, AppTable, AppTableColumn } from '@/shared/ui'

defineProps<{
  users: User[]
  loading: boolean
}>()

const emit = defineEmits<{
  remove: [id: number]
}>()
</script>

<template>
  <AppTable :value="users" :loading="loading">
    <AppTableColumn header="Фото">
      <template #body="{ data }">
        <img class="avatar" :src="data.image" :alt="data.firstName" />
      </template>
    </AppTableColumn>
    <AppTableColumn header="Ім'я">
      <template #body="{ data }">{{ data.firstName }} {{ data.lastName }}</template>
    </AppTableColumn>
    <AppTableColumn field="email" header="E-mail" />
    <AppTableColumn field="username" header="Username" />
    <AppTableColumn header="Дії">
      <template #body="{ data }">
        <div class="actions">
          <RouterLink class="table-link" :to="{ name: 'user-details', params: { id: data.id } }">Деталі</RouterLink>
          <AppButton label="Видалити" severity="danger" outlined size="small" @click="emit('remove', data.id)" />
        </div>
      </template>
    </AppTableColumn>
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
