<script setup lang="ts">
import { ref } from 'vue'
import { Field, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { AppButton, AppInput } from '@/shared/ui'

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
  <Form :validation-schema="schema" @submit="login">
    <p v-if="error" class="message message--error" role="alert">{{ error }}</p>

    <Field v-slot="{ value, handleChange, errorMessage }" name="username">
      <AppInput
        id="username"
        :model-value="String(value ?? '')"
        label="Username"
        placeholder="emilys"
        :error="errorMessage"
        @update:model-value="handleChange"
      />
    </Field>

    <Field v-slot="{ value, handleChange, errorMessage }" name="password">
      <AppInput
        id="password"
        :model-value="String(value ?? '')"
        label="Пароль"
        type="password"
        placeholder="emilyspass"
        :error="errorMessage"
        @update:model-value="handleChange"
      />
    </Field>

    <AppButton class="auth-submit" type="submit" label="Увійти" />
  </Form>
</template>

<style scoped>
form {
  display: grid;
  gap: 1rem;
}

.auth-submit {
  justify-self: start;
}
</style>
