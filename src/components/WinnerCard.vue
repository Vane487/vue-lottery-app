<script setup lang="ts">
import AppButton from './AppButton.vue'
import type { Participant } from '../types/participant'

defineProps<{
  participant: Participant
}>()

const emit = defineEmits<{
  remove: [id: string]
}>()
</script>

<template>
  <span class="winner-chip">
    {{ participant.name }}
    <AppButton variant="outline" class="winner-remove" @click="emit('remove', participant.id)">×</AppButton>
  </span>
</template>

<style scoped lang="scss">
.winner-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.35rem 0.3rem 0.7rem;
  border-radius: 999px;
  color: white;
  background: #0d6efd;
  font-size: 0.9rem;
}

.winner-remove {
  min-width: 1.35rem;
  padding: 0;
  border: 0;
  color: inherit;
  font-size: 1rem;
  line-height: 1;
}
</style>
