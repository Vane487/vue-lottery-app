<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    id: string
    label: string
    type?: 'text' | 'email' | 'tel' | 'date'
    placeholder?: string
    error?: string
    max?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
    max: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="mb-3">
    <label class="form-label fw-semibold" :for="id">{{ label }}</label>
    <input
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :max="max"
      @input="updateValue"
    />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>
