<script setup lang="ts">
import { computed } from 'vue'
import AppButton from './AppButton.vue'
import WinnerCard from './WinnerCard.vue'
import type { Participant } from '../types/participant'

const props = defineProps<{
  participants: Participant[]
  winnerIds: string[]
}>()

const emit = defineEmits<{
  pick: []
  remove: [id: string]
}>()

const winners = computed(() =>
  props.winnerIds
    .map((id) => props.participants.find((participant) => participant.id === id))
    .filter((participant): participant is Participant => Boolean(participant)),
)

const canPickWinner = computed(
  () => winners.value.length < 3 && props.participants.some((item) => !props.winnerIds.includes(item.id)),
)
</script>

<template>
  <section class="card shadow-sm border-0 mb-4">
    <div class="card-body d-flex flex-column flex-md-row gap-3 align-items-md-center">
      <div class="winner-list flex-grow-1">
        <WinnerCard
          v-for="winner in winners"
          :key="winner.id"
          :participant="winner"
          @remove="emit('remove', $event)"
        />
        <span v-if="winners.length === 0" class="text-secondary">Переможців ще немає</span>
      </div>
      <AppButton :disabled="!canPickWinner" @click="emit('pick')">New winner</AppButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.winner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 2.4rem;
  align-items: center;
}
</style>
