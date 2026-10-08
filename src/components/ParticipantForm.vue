<script setup lang="ts">
import { reactive, watch } from 'vue'
import AppButton from './AppButton.vue'
import FormField from './FormField.vue'
import type { FormErrors, Participant, ParticipantDraft } from '../types/participant'

const props = withDefaults(
  defineProps<{
    participants: Participant[]
    participant?: Participant | null
    submitLabel?: string
  }>(),
  {
    participant: null,
    submitLabel: 'Зберегти',
  },
)

const emit = defineEmits<{
  save: [participant: ParticipantDraft]
}>()

const today = new Date().toISOString().slice(0, 10)

function emptyForm(): ParticipantDraft {
  return { name: '', birthDate: '', email: '', phone: '' }
}

const form = reactive<ParticipantDraft>(emptyForm())
const errors = reactive<FormErrors>({})

function clearErrors(): void {
  errors.name = undefined
  errors.birthDate = undefined
  errors.email = undefined
  errors.phone = undefined
}

function resetForm(): void {
  Object.assign(form, emptyForm())
  clearErrors()
}

function validate(): boolean {
  clearErrors()

  if (!form.name.trim()) errors.name = "Введи ім'я."
  if (!form.birthDate) errors.birthDate = 'Вибери дату народження.'
  if (form.birthDate > today) errors.birthDate = 'Дата народження не може бути у майбутньому.'

  const email = form.email.trim().toLowerCase()
  if (!email) {
    errors.email = 'Введи e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Введи коректний e-mail.'
  } else if (
    props.participants.some(
      (item) => item.email.toLowerCase() === email && item.id !== props.participant?.id,
    )
  ) {
    errors.email = 'Учасник з таким e-mail уже є.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Введи телефон.'
  } else if (!/^\+380\d{9}$/.test(form.phone.trim())) {
    errors.phone = 'Формат: +380XXXXXXXXX.'
  }

  return !Object.values(errors).some(Boolean)
}

function submit(): void {
  if (!validate()) return

  emit('save', {
    name: form.name.trim(),
    birthDate: form.birthDate,
    email: form.email.trim(),
    phone: form.phone.trim(),
  })

  if (!props.participant) resetForm()
}

watch(
  () => props.participant,
  (participant) => {
    Object.assign(form, participant ? { ...participant } : emptyForm())
    clearErrors()
  },
  { immediate: true },
)
</script>

<template>
  <form novalidate @submit.prevent="submit" @keyup.enter.prevent="submit">
    <FormField v-model="form.name" id="name" label="Ім'я" placeholder="Введи ім'я учасника" :error="errors.name" />
    <FormField
      v-model="form.birthDate"
      id="birth-date"
      label="Дата народження"
      type="date"
      :max="today"
      :error="errors.birthDate"
    />
    <FormField v-model="form.email" id="email" label="E-mail" type="email" placeholder="name@example.com" :error="errors.email" />
    <FormField
      v-model="form.phone"
      id="phone"
      label="Телефон"
      type="tel"
      placeholder="+380XXXXXXXXX"
      :error="errors.phone"
    />
    <AppButton type="submit">{{ submitLabel }}</AppButton>
  </form>
</template>
