<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { AppButton } from '@/shared/ui'

const router = useRouter()
const session = useSessionStore()

function logout(): void {
  session.clearSession()
  void router.push({ name: 'login' })
}
</script>

<template>
  <AppButton label="Вийти" severity="secondary" text @click="logout" />
</template>
