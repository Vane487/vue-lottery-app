<script setup lang="ts">
import { ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = useRouter()
const route = useRoute()
const session = useSessionStore()
const error = ref('')

const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, 'Введи username.'),
    password: z.string().min(6, 'Пароль має містити щонайменше 6 символів.'),
  }),
)

async function login(values: Record<string, unknown>): Promise<void> {
  error.value = ''
  try {
    await session.login(String(values.username ?? ''), String(values.password ?? ''))
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/users'
    await router.push(redirect)
  } catch {
    error.value = 'Не вдалося увійти. Перевір username і пароль.'
  }
}
</script>

<template>
  <h1 class="h2 mt-4">Login</h1>
  <p class="text-secondary">Для перевірки API: <code>emilys</code> / <code>emilyspass</code></p>

  <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

  <Form :validation-schema="schema" @submit="login">
    <div class="mb-3">
      <label class="form-label" for="username">Username</label>
      <Field id="username" name="username" class="form-control" />
      <ErrorMessage class="invalid-feedback d-block" name="username" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="password">Пароль</label>
      <Field id="password" name="password" type="password" class="form-control" />
      <ErrorMessage class="invalid-feedback d-block" name="password" />
    </div>
    <button class="btn btn-primary" type="submit">Увійти</button>
  </Form>
</template>
