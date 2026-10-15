<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/entities/theme'
import { AppButton } from '@/shared/ui'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const label = computed(() => (theme.value === 'light' ? 'Темна тема' : 'Світла тема'))
</script>

<template>
  <AppButton :label="label" severity="secondary" text @click="themeStore.toggleTheme" />
</template>
