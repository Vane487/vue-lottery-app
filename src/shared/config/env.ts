export const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error('Не задано VITE_API_URL у файлі .env')
}
