<template>
  <section class="panel not-found">
    <p class="not-found__code">404</p>
    <h1>Сторінку не знайдено</h1>
    <RouterLink class="button-link" to="/">На головну</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
}

.not-found__code {
  margin: 0;
  color: #2563eb;
  font-size: 5rem;
  font-weight: 800;
}
</style>
