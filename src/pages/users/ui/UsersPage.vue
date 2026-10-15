<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/entities/user'

const route = useRoute()
const router = useRouter()
const store = useUsersStore()
const search = ref('')
const actionError = ref('')

const currentPage = computed(() => {
  const page = Number(route.query.page ?? 1)
  return Number.isInteger(page) && page > 0 ? page : 1
})

const pageCount = computed(() => Math.max(1, Math.ceil(store.total / 10)))

watch(
  () => [route.query.page, route.query.q],
  ([page, query]) => {
    const q = typeof query === 'string' ? query : ''
    search.value = q
    void store.fetchUsers({ page: Number(page) > 0 ? Number(page) : 1, query: q })
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

async function removeUser(id: number): Promise<void> {
  actionError.value = ''
  try {
    await store.removeUser(id)
  } catch (reason) {
    actionError.value = reason instanceof Error ? reason.message : 'Не вдалося видалити користувача.'
  }
}
</script>

<template>
  <section class="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
    <div>
      <p class="text-primary fw-bold text-uppercase mb-1">DummyJSON API</p>
      <h1 class="h2 mb-1">Users</h1>
      <p class="text-secondary mb-0">Знайдено: {{ store.total }}</p>
    </div>
    <RouterLink class="btn btn-primary" :to="{ name: 'user-create' }">Додати користувача</RouterLink>
  </section>

  <form class="row g-2 mb-3" @submit.prevent="searchUsers">
    <div class="col-sm-8 col-md-6">
      <label class="visually-hidden" for="search">Пошук користувача</label>
      <input id="search" v-model.trim="search" class="form-control" placeholder="Пошук за ім'ям" />
    </div>
    <div class="col-auto">
      <button class="btn btn-outline-primary" type="submit">Шукати</button>
    </div>
  </form>

  <div v-if="store.isLoading" class="alert alert-info">Завантаження користувачів…</div>
  <div v-else-if="store.error" class="alert alert-danger">{{ store.error }}</div>
  <div v-else class="card border-0 shadow-sm overflow-hidden">
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Ім'я</th>
            <th>E-mail</th>
            <th>Username</th>
            <th aria-label="Дії"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in store.users" :key="user.id">
            <td><img class="avatar" :src="user.image" :alt="user.firstName" /></td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td class="text-nowrap">
              <RouterLink class="btn btn-sm btn-outline-primary me-2" :to="{ name: 'user-details', params: { id: user.id } }">
                Деталі
              </RouterLink>
              <button class="btn btn-sm btn-outline-danger" type="button" @click="removeUser(user.id)">Видалити</button>
            </td>
          </tr>
          <tr v-if="!store.users.length">
            <td colspan="5" class="text-center text-secondary py-4">Користувачів не знайдено.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="actionError" class="alert alert-danger mt-3">{{ actionError }}</div>

  <nav v-if="pageCount > 1" class="mt-4" aria-label="Пагінація">
    <div class="d-flex gap-2 align-items-center">
      <button class="btn btn-outline-secondary" :disabled="currentPage === 1" @click="updateQuery(currentPage - 1)">← Назад</button>
      <span>Сторінка {{ currentPage }} з {{ pageCount }}</span>
      <button class="btn btn-outline-secondary" :disabled="currentPage === pageCount" @click="updateQuery(currentPage + 1)">Вперед →</button>
    </div>
  </nav>
</template>

<style scoped>
.avatar {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
