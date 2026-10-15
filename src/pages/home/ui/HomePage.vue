<template>
  <section class="hero panel">
    <p class="eyebrow">Лабораторні №5–6</p>
    <h1>Vue Lottery із FSD та Pinia</h1>
    <p class="muted">
      Це SPA-застосунок на Vue 3: маршрути, авторизація, список користувачів, REST API DummyJSON і Feature-Sliced Design.
    </p>
    <div class="tags">
      <span>Vue 3</span><span>TypeScript</span><span>Vue Router</span><span>Pinia</span><span>PrimeVue</span><span>VeeValidate + Zod</span>
    </div>
    <a class="button-link" href="https://github.com/Vane487/vue-lottery-app" target="_blank" rel="noreferrer">GitHub проєкту</a>
  </section>
</template>

<style scoped>
.hero {
  max-width: 850px;
}

.eyebrow {
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.tags span {
  padding: 0.35rem 0.65rem;
  background: #eaf2ff;
  border-radius: 999px;
}
</style>
