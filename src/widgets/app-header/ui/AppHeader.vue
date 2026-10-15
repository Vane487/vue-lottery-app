<script setup lang="ts">
import AppNavigation from './AppNavigation.vue'
import AppLogo from './AppLogo.vue'
</script>

<template>
  <header class="app-header">
    <div class="app-header__inside">
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
