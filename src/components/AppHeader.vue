<script setup lang="ts">
import AppNavigation from './AppNavigation.vue'
import AppLogo from './AppLogo.vue'
</script>

<template>
  <header class="app-header">
    <div class="container py-3 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center">
      <AppLogo />
      <AppNavigation />
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: white;
  border-bottom: 1px solid #dbe4f0;
}
</style>
