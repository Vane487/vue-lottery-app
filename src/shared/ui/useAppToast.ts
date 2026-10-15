import { useToast } from 'primevue/usetoast'

export function useAppToast(): {
  success: (detail: string) => void
  error: (detail: string) => void
} {
  const toast = useToast()

  function success(detail: string): void {
    toast.add({ severity: 'success', summary: 'Готово', detail, life: 3000 })
  }

  function error(detail: string): void {
    toast.add({ severity: 'error', summary: 'Помилка', detail, life: 4000 })
  }

  return { success, error }
}
