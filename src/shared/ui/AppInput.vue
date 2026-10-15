<script setup lang="ts">
import InputText from 'primevue/inputtext'

withDefaults(
  defineProps<{
    id: string
    label?: string
    type?: string
    placeholder?: string
    error?: string
    disabled?: boolean
  }>(),
  { label: '', type: 'text', placeholder: '', error: '', disabled: false },
)

const model = defineModel<string | null>({ default: '' })
</script>

<template>
  <div class="app-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <InputText
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :invalid="Boolean(error)"
      :disabled="disabled"
      class="app-input__control"
    />
    <small v-if="error" class="app-input__error">{{ error }}</small>
  </div>
</template>

<style scoped>
.app-input {
  display: grid;
  gap: 0.35rem;
}

label {
  font-weight: 600;
}

.app-input__control {
  width: 100%;
}

.app-input__error {
  color: #d92d20;
}
</style>
