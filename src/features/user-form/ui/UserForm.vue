<script setup lang="ts">
import { computed } from 'vue'
import { Field, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { CreateUserDto, User } from '@/entities/user'
import { AppButton, AppInput } from '@/shared/ui'

const props = withDefaults(
  defineProps<{
    user?: User | null
    submitLabel?: string
  }>(),
  { user: null, submitLabel: 'Зберегти' },
)

const emit = defineEmits<{
  save: [values: CreateUserDto]
}>()

const schema = toTypedSchema(
  z.object({
    firstName: z.string().trim().min(1, "Введи ім'я."),
    lastName: z.string().trim().min(1, 'Введи прізвище.'),
    email: z.string().trim().email('Введи коректний e-mail.'),
    username: z.string().trim().min(3, 'Username має містити щонайменше 3 символи.'),
    password: z.string().min(6, 'Пароль має містити щонайменше 6 символів.'),
    age: z.coerce.number().int().min(1, 'Вкажи вік.').max(120, 'Вкажи коректний вік.'),
    gender: z.string().min(1, 'Обери стать.'),
    phone: z.string().trim().min(5, 'Введи телефон.'),
  }),
)

const initialValues = computed(() => ({
  firstName: props.user?.firstName ?? '',
  lastName: props.user?.lastName ?? '',
  email: props.user?.email ?? '',
  username: props.user?.username ?? '',
  password: '',
  age: props.user?.age ?? undefined,
  gender: props.user?.gender ?? '',
  phone: props.user?.phone ?? '',
}))

function submit(values: Record<string, unknown>): void {
  emit('save', {
    firstName: String(values.firstName ?? ''),
    lastName: String(values.lastName ?? ''),
    email: String(values.email ?? ''),
    username: String(values.username ?? ''),
    password: String(values.password ?? ''),
    age: Number(values.age),
    gender: String(values.gender ?? ''),
    phone: String(values.phone ?? ''),
  })
}
</script>

<template>
  <Form :key="user?.id ?? 'new'" :validation-schema="schema" :initial-values="initialValues" @submit="submit">
    <div class="form-grid">
      <Field v-slot="{ value, handleChange, errorMessage }" name="firstName">
        <AppInput id="firstName" :model-value="String(value ?? '')" label="Ім'я" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="lastName">
        <AppInput id="lastName" :model-value="String(value ?? '')" label="Прізвище" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="email">
        <AppInput id="email" :model-value="String(value ?? '')" label="E-mail" type="email" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="username">
        <AppInput id="username" :model-value="String(value ?? '')" label="Username" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="password">
        <AppInput id="password" :model-value="String(value ?? '')" label="Пароль" type="password" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="age">
        <AppInput id="age" :model-value="String(value ?? '')" label="Вік" type="number" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="gender">
        <div class="native-field">
          <label for="gender">Стать</label>
          <select id="gender" :value="value" :class="{ invalid: errorMessage }" @change="handleChange">
            <option value="">Обери варіант</option>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
            <option value="other">Інша</option>
          </select>
          <small v-if="errorMessage">{{ errorMessage }}</small>
        </div>
      </Field>
      <Field v-slot="{ value, handleChange, errorMessage }" name="phone">
        <AppInput id="phone" :model-value="String(value ?? '')" label="Телефон" :error="errorMessage" @update:model-value="handleChange" />
      </Field>
    </div>
    <AppButton class="submit-button" type="submit" :label="submitLabel" />
  </Form>
</template>

<style scoped>
form {
  display: grid;
  gap: 1.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.native-field {
  display: grid;
  gap: 0.35rem;
}

.native-field label {
  font-weight: 600;
}

.native-field select {
  width: 100%;
  padding: 0.72rem;
  color: inherit;
  background: transparent;
  border: 1px solid #cbd5e1;
  border-radius: 0.45rem;
}

.native-field select.invalid {
  border-color: #d92d20;
}

.native-field small {
  color: #d92d20;
}

.submit-button {
  justify-self: start;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
