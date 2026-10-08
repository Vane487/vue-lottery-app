<script setup lang="ts">
import AppButton from './AppButton.vue'
import type { Participant, SortDirection, SortField } from '../types/participant'

const props = defineProps<{
  participants: Participant[]
  sortField: SortField
  sortDirection: SortDirection
}>()

const emit = defineEmits<{
  edit: [participant: Participant]
  remove: [participant: Participant]
  sort: [field: Exclude<SortField, null>]
}>()

function sortMark(field: Exclude<SortField, null>): string {
  if (props.sortField !== field) return '↕'
  return props.sortDirection === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <section class="card shadow-sm border-0">
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <button class="sort-button" @click="emit('sort', 'name')">Ім'я {{ sortMark('name') }}</button>
              </th>
              <th>
                <button class="sort-button" @click="emit('sort', 'birthDate')">Дата народження {{ sortMark('birthDate') }}</button>
              </th>
              <th>E-mail</th>
              <th>Телефон</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in participants" :key="participant.id">
              <td>{{ index + 1 }}</td>
              <td>{{ participant.name }}</td>
              <td>{{ participant.birthDate }}</td>
              <td>{{ participant.email }}</td>
              <td>{{ participant.phone }}</td>
              <td class="actions-cell">
                <AppButton variant="secondary" @click="emit('edit', participant)">Редагувати</AppButton>
                <AppButton variant="danger" @click="emit('remove', participant)">Видалити</AppButton>
              </td>
            </tr>
            <tr v-if="participants.length === 0">
              <td colspan="6" class="text-center text-secondary py-4">Учасників за цим пошуком немає.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sort-button {
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font-weight: 700;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  min-width: 220px;
}
</style>
