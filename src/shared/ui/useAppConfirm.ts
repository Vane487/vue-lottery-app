import { useConfirm } from 'primevue/useconfirm'

export function useAppConfirm(): { askToDelete: (onAccept: () => void) => void } {
  const confirm = useConfirm()

  function askToDelete(onAccept: () => void): void {
    confirm.require({
      header: 'Видалити користувача?',
      message: 'Цю дію не можна скасувати.',
      acceptLabel: 'Видалити',
      rejectLabel: 'Скасувати',
      acceptProps: { severity: 'danger' },
      rejectProps: { severity: 'secondary', outlined: true },
      accept: onAccept,
    })
  }

  return { askToDelete }
}
