<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialog = ref<HTMLElement | null>(null)

function close(): void {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      dialog.value?.focus()
    }
  },
)
</script>

<template>
  <div v-if="modelValue" ref="dialog" class="modal-backdrop-custom" tabindex="-1" @click.self="close" @keydown.esc.prevent="close">
    <section class="modal-card shadow" role="dialog" aria-modal="true">
      <header class="modal-header-custom">
        <slot name="header">Повідомлення</slot>
        <button class="btn-close" type="button" aria-label="Закрити" @click="close"></button>
      </header>
      <div class="modal-body-custom">
        <slot />
      </div>
      <footer v-if="$slots.footer" class="modal-footer-custom">
        <slot name="footer" />
      </footer>
    </section>
  </div>
</template>

<style scoped lang="scss">
.modal-backdrop-custom {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgb(15 23 42 / 55%);
}

.modal-card {
  width: min(100%, 620px);
  overflow: hidden;
  border-radius: 1rem;
  background: white;
}

.modal-header-custom,
.modal-footer-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-body-custom {
  padding: 1.25rem;
}

.modal-footer-custom {
  justify-content: flex-end;
  border-top: 1px solid #dee2e6;
  border-bottom: 0;
}
</style>
