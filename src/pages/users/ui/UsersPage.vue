<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/entities/user'
import { UsersTable } from '@/widgets/users-table'
import { AppButton, AppInput, useAppConfirm, useAppToast } from '@/shared/ui'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()
const { users, total, isLoading, error } = storeToRefs(usersStore)
const search = ref('')
const actionError = ref('')
const { askToDelete } = useAppConfirm()
const toast = useAppToast()

const currentPage = computed(() => {
  const page = Number(route.query.page ?? 1)
  return Number.isInteger(page) && page > 0 ? page : 1
})

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / 10)))

watch(
  () => [route.query.page, route.query.q],
  ([page, query]) => {
    const q = typeof query === 'string' ? query : ''
    search.value = q
    void usersStore.fetchUsers({ page: Number(page) > 0 ? Number(page) : 1, query: q })
  },
  { immediate: true },
)

function updateQuery(page = 1): void {
  void router.push({
    name: 'users',
    query: {
      page: String(page),
      ...(search.value.trim() ? { q: search.value.trim() } : {}),
    },
  })
}

function searchUsers(): void {
  updateQuery(1)
}

function confirmRemove(id: number): void {
  askToDelete(() => void removeUser(id))
}

async function removeUser(id: number): Promise<void> {
  actionError.value = ''

  try {
    await usersStore.removeUser(id)
    toast.success('Користувача видалено зі списку.')
  } catch (reason) {
    actionError.value = reason instanceof Error ? reason.message : 'Не вдалося видалити користувача.'
  }
}
</script>

<template>
  <section class="page-heading">
    <div>
      <p class="eyebrow">DummyJSON API</p>
      <h1>Користувачі</h1>
      <p class="muted">Знайдено: {{ total }}</p>
    </div>
    <RouterLink class="button-link" :to="{ name: 'user-create' }">Додати користувача</RouterLink>
  </section>

  <form class="search-form" @submit.prevent="searchUsers">
    <AppInput id="search" v-model="search" placeholder="Пошук за ім'ям" />
    <AppButton type="submit" label="Шукати" outlined />
  </form>

  <p v-if="error" class="message message--error">{{ error }}</p>
  <section v-else class="panel table-panel">
    <UsersTable :users="users" :loading="isLoading" @remove="confirmRemove" />
  </section>

  <p v-if="actionError" class="message message--error">{{ actionError }}</p>

  <nav v-if="pageCount > 1" class="pagination" aria-label="Пагінація">
    <AppButton label="← Назад" severity="secondary" outlined :disabled="currentPage === 1" @click="updateQuery(currentPage - 1)" />
    <span>Сторінка {{ currentPage }} з {{ pageCount }}</span>
    <AppButton label="Вперед →" severity="secondary" outlined :disabled="currentPage === pageCount" @click="updateQuery(currentPage + 1)" />
  </nav>
</template>

<style scoped>
.page-heading {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.3rem;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.search-form {
  display: flex;
  gap: 0.75rem;
  max-width: 38rem;
  margin-bottom: 1rem;
}

.search-form :deep(.app-input) {
  flex: 1;
}

.table-panel {
  overflow: auto;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1.5rem;
}

@media (max-width: 540px) {
  .search-form {
    flex-direction: column;
  }
}
</style>
