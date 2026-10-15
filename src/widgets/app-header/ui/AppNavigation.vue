<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = useRouter()
const session = useSessionStore()

function logout(): void {
  session.clearSession()
  void router.push({ name: 'login' })
}
</script>

<template>
  <nav class="app-navigation" aria-label="Головна навігація">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About author</RouterLink>
    <RouterLink to="/users">Users</RouterLink>
    <button v-if="session.isAuthenticated" type="button" class="nav-logout" @click="logout">Logout</button>
    <RouterLink v-else to="/login">Login</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.app-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.app-navigation :deep(a),
.nav-logout {
  padding: 0.45rem 0.7rem;
  color: #42526b;
  font-weight: 600;
  text-decoration: none;
  background: transparent;
  border: 0;
  border-radius: 0.45rem;
}

.app-navigation :deep(a.router-link-exact-active) {
  color: #0969da;
  background: #e7f1ff;
}

.nav-logout:hover {
  color: #b42318;
}
</style>
