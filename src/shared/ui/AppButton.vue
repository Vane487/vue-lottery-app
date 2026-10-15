<script setup lang="ts">
import Button from 'primevue/button'

withDefaults(
  defineProps<{
    label?: string
    type?: 'button' | 'submit' | 'reset'
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
    loading?: boolean
    disabled?: boolean
    outlined?: boolean
    text?: boolean
    size?: 'small' | 'large'
  }>(),
  { type: 'button', loading: false, disabled: false, outlined: false, text: false },
)
</script>

<template>
  <Button
    :label="label"
    :type="type"
    :severity="severity"
    :loading="loading"
    :disabled="disabled"
    :outlined="outlined"
    :text="text"
    :size="size"
  >
    <slot />
  </Button>
</template>
