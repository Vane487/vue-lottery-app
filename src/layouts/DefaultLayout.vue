<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main class="container py-5">
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
