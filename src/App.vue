<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppButton from './components/AppButton.vue'
import AppModal from './components/AppModal.vue'
import ParticipantForm from './components/ParticipantForm.vue'
import ParticipantsTable from './components/ParticipantsTable.vue'
import SearchBar from './components/SearchBar.vue'
import WinnersPanel from './components/WinnersPanel.vue'
import type { Participant, ParticipantDraft, SortDirection, SortField } from './types/participant'

const storageKey = 'vue-lottery-participants'
const participants = ref<Participant[]>([])
const winnerIds = ref<string[]>([])
const searchTerm = ref('')
const sortField = ref<SortField>(null)
const sortDirection = ref<SortDirection>('asc')
const editingParticipant = ref<Participant | null>(null)
const deletingParticipant = ref<Participant | null>(null)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const notice = ref('')

const visibleParticipants = computed(() => {
  const query = searchTerm.value.toLocaleLowerCase('uk').trim()
  const filtered = participants.value.filter((participant) =>
    participant.name.toLocaleLowerCase('uk').includes(query),
  )

  if (!sortField.value) return filtered

  return [...filtered].sort((first, second) => {
    const result =
      sortField.value === 'name'
        ? first.name.localeCompare(second.name, 'uk')
        : first.birthDate.localeCompare(second.birthDate)

    return sortDirection.value === 'asc' ? result : -result
  })
})

onMounted(() => {
  const saved = localStorage.getItem(storageKey)
  if (!saved) return

  try {
    const restored = JSON.parse(saved) as Participant[]
    if (Array.isArray(restored)) participants.value = restored
  } catch {
    localStorage.removeItem(storageKey)
  }
})

watch(
  participants,
  (value) => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  },
  { deep: true },
)

function newId(): string {
  return crypto.randomUUID()
}

function addParticipant(draft: ParticipantDraft): void {
  participants.value.push({ id: newId(), ...draft })
  notice.value = 'Учасника успішно додано.'
}

function openEdit(participant: Participant): void {
  editingParticipant.value = { ...participant }
  isEditModalOpen.value = true
}

function updateParticipant(draft: ParticipantDraft): void {
  if (!editingParticipant.value) return

  const index = participants.value.findIndex((item) => item.id === editingParticipant.value?.id)
  if (index === -1) return

  participants.value[index] = { id: editingParticipant.value.id, ...draft }
  isEditModalOpen.value = false
  editingParticipant.value = null
  notice.value = 'Дані учасника оновлено.'
}

function askDelete(participant: Participant): void {
  deletingParticipant.value = participant
  isDeleteModalOpen.value = true
}

function deleteParticipant(): void {
  if (!deletingParticipant.value) return

  const id = deletingParticipant.value.id
  participants.value = participants.value.filter((participant) => participant.id !== id)
  winnerIds.value = winnerIds.value.filter((winnerId) => winnerId !== id)
  isDeleteModalOpen.value = false
  deletingParticipant.value = null
  notice.value = 'Учасника видалено.'
}

function selectWinner(): void {
  const available = participants.value.filter((participant) => !winnerIds.value.includes(participant.id))
  if (available.length === 0 || winnerIds.value.length >= 3) return

  const winner = available[Math.floor(Math.random() * available.length)]
  if (!winner) return

  winnerIds.value.push(winner.id)
  notice.value = `Новий переможець: ${winner.name}.`
}

function removeWinner(id: string): void {
  winnerIds.value = winnerIds.value.filter((winnerId) => winnerId !== id)
}

function toggleSort(field: Exclude<SortField, null>): void {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    return
  }

  sortField.value = field
  sortDirection.value = 'asc'
}
</script>

<template>
  <main class="lottery-page">
    <div class="container py-5">
      <header class="page-header mb-4">
        <p class="text-primary fw-bold text-uppercase mb-1">Лабораторна робота №4</p>
        <h1>Vue Lottery</h1>
        <p class="text-secondary mb-0">Реєструй учасників і випадково обирай до трьох переможців.</p>
      </header>

      <div v-if="notice" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ notice }}
        <button type="button" class="btn-close" aria-label="Закрити" @click="notice = ''"></button>
      </div>

      <WinnersPanel :participants="participants" :winner-ids="winnerIds" @pick="selectWinner" @remove="removeWinner" />

      <section class="card shadow-sm border-0 mb-4">
        <div class="card-body p-4">
          <h2 class="h5 text-uppercase fw-bold">Форма реєстрації</h2>
          <p class="text-secondary">Заповни всі поля. Натисни Enter або Save для додавання учасника.</p>
          <ParticipantForm :participants="participants" @save="addParticipant" />
        </div>
      </section>

      <section class="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-end mb-3">
        <div>
          <h2 class="h4 mb-1">Учасники</h2>
          <p class="text-secondary mb-0">Усього зареєстровано: {{ participants.length }}</p>
        </div>
        <SearchBar @filter-by-name="searchTerm = $event" />
      </section>

      <ParticipantsTable
        :participants="visibleParticipants"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @edit="openEdit"
        @remove="askDelete"
        @sort="toggleSort"
      />
    </div>

    <AppModal v-model="isEditModalOpen">
      <template #header>
        <strong>Редагувати дані учасника</strong>
      </template>
      <ParticipantForm
        :participant="editingParticipant"
        :participants="participants"
        submit-label="Оновити дані"
        @save="updateParticipant"
      />
    </AppModal>

    <AppModal v-model="isDeleteModalOpen">
      <template #header>
        <strong>Підтвердження видалення</strong>
      </template>
      <p class="mb-0">
        Ви дійсно бажаєте видалити учасника <strong>{{ deletingParticipant?.name }}</strong>,
        <strong>{{ deletingParticipant?.email }}</strong>?
      </p>
      <template #footer>
        <AppButton variant="secondary" @click="isDeleteModalOpen = false">Ні</AppButton>
        <AppButton variant="danger" @click="deleteParticipant">Так, видалити</AppButton>
      </template>
    </AppModal>
  </main>
</template>

<style scoped lang="scss">
.lottery-page {
  min-height: 100vh;
  background: #f4f7fb;
}

.page-header h1 {
  margin-bottom: 0.5rem;
  font-weight: 800;
}
</style>
