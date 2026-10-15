<template>
  <RouterLink class="logo" to="/" aria-label="Vue Lottery — головна сторінка">
    <span class="logo-mark">V</span>
    <span>Vue Lottery</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  color: #172033;
  font-weight: 800;
  text-decoration: none;
}

.logo-mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  color: white;
  background: #42b883;
  border-radius: 0.5rem;
  place-items: center;
}
</style>
