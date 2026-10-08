<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const emit = defineEmits<{
  'filter-by-name': [value: string]
}>()

const query = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

watch(query, (value) => {
  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    emit('filter-by-name', value.trim())
  }, 300)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="search-bar">
    <label class="form-label fw-semibold" for="search">Пошук за ім'ям</label>
    <input id="search" v-model.trim="query" class="form-control" placeholder="Введи ім'я учасника" />
    <small class="text-secondary">Пошук спрацьовує через 300 мс.</small>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  max-width: 360px;
}
</style>
