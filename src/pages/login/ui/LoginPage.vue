<script setup lang="ts">
import { LoginForm } from '@/features/auth'
</script>

<template>
  <section>
    <h1>Вхід</h1>
    <p class="muted">Для перевірки API: <code>emilys</code> / <code>emilyspass</code></p>
    <LoginForm />
  </section>
</template>
