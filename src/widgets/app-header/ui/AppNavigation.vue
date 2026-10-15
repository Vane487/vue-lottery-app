<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSessionStore } from '@/entities/session'
import { LogoutButton } from '@/features/auth'
import { ThemeToggle } from '@/features/theme-toggle'

const session = useSessionStore()
const { isAuthenticated } = storeToRefs(session)
</script>

<template>
  <nav class="app-navigation" aria-label="Головна навігація">
    <RouterLink to="/">Головна</RouterLink>
    <RouterLink to="/about">Про автора</RouterLink>
    <RouterLink to="/users">Користувачі</RouterLink>
    <LogoutButton v-if="isAuthenticated" />
    <RouterLink v-else to="/login">Вхід</RouterLink>
    <ThemeToggle />
  </nav>
</template>

<style scoped lang="scss">
.app-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.app-navigation :deep(a) {
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
</style>
