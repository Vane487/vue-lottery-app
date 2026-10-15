<script setup lang="ts">
import Column from 'primevue/column'

defineProps<{
  field?: string
  header?: string
}>()
</script>

<template>
  <Column :field="field" :header="header">
    <template v-if="$slots.body" #body="slotProps">
      <slot name="body" v-bind="slotProps" />
    </template>
  </Column>
</template>
