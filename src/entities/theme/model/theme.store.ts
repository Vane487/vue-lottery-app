import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<Theme>('light')

    function applyTheme(): void {
      document.documentElement.classList.toggle('app-dark', theme.value === 'dark')
    }

    function toggleTheme(): void {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      applyTheme()
    }

    return { theme, applyTheme, toggleTheme }
  },
  { persist: { key: 'vue-lottery:theme', pick: ['theme'] } },
)
