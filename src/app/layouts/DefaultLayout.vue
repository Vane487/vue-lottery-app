<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main class="page-container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100vh;
  background: #f4f7fb;
}
</style>
