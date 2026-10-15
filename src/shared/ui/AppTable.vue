<script setup lang="ts">
import DataTable from 'primevue/datatable'

withDefaults(
  defineProps<{
    value: unknown[]
    loading?: boolean
  }>(),
  { loading: false },
)
</script>

<template>
  <DataTable :value="value" :loading="loading" striped-rows responsive-layout="scroll">
    <slot />
  </DataTable>
</template>
