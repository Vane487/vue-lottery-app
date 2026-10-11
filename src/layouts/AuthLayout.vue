<template>
  <main class="auth-layout">
    <section class="auth-card card shadow-sm border-0">
      <div class="card-body p-4 p-md-5">
        <RouterLink class="small text-decoration-none" to="/">← На головну</RouterLink>
        <slot />
      </div>
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
}
</style>
