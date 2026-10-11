<script setup lang="ts">
import { computed } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { CreateUserDto, User } from '@/types/user'

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
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label" for="firstName">Ім'я</label>
        <Field id="firstName" name="firstName" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="firstName" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="lastName">Прізвище</label>
        <Field id="lastName" name="lastName" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="lastName" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="email">E-mail</label>
        <Field id="email" name="email" type="email" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="email" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="username">Username</label>
        <Field id="username" name="username" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="username" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="password">Пароль</label>
        <Field id="password" name="password" type="password" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="password" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="age">Вік</label>
        <Field id="age" name="age" type="number" min="1" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="age" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="gender">Стать</label>
        <Field id="gender" name="gender" as="select" class="form-select">
          <option value="">Обери варіант</option>
          <option value="male">Чоловіча</option>
          <option value="female">Жіноча</option>
          <option value="other">Інша</option>
        </Field>
        <ErrorMessage class="invalid-feedback d-block" name="gender" />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="phone">Телефон</label>
        <Field id="phone" name="phone" class="form-control" />
        <ErrorMessage class="invalid-feedback d-block" name="phone" />
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-4">{{ submitLabel }}</button>
  </Form>
</template>
