<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AuthLayout from '@/app/layouts/AuthLayout.vue'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import { AppConfirmDialog, AppToast } from '@/shared/ui'

const route = useRoute()

const layout = computed(() => (route.meta.layout === 'auth' ? AuthLayout : DefaultLayout))
</script>

<template>
  <AppToast />
  <AppConfirmDialog />
  <component :is="layout">
    <RouterView />
  </component>
</template>
