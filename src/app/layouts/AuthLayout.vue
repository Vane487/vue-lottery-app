<template>
  <main class="auth-layout">
    <section class="auth-card">
      <RouterLink class="back-link" to="/">← На головну</RouterLink>
      <slot />
    </section>
  </main>
</template>

<style scoped>
.auth-layout {
  display: grid;
  min-height: 100vh;
  padding: 1rem;
  background: #edf5ff;
  place-items: center;
}

.auth-card {
  width: min(100%, 480px);
  padding: 2rem;
  background: white;
  border: 1px solid #dbe4f0;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgb(32 50 79 / 10%);
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
}
</style>
