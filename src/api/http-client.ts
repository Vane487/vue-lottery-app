const baseUrl = import.meta.env.VITE_API_URL

if (!baseUrl) {
  throw new Error('Не задано VITE_API_URL у файлі .env')
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

let getAccessToken = (): string | null => localStorage.getItem('lottery-access-token')
let refreshAccessToken: (() => Promise<string | null>) | null = null

export function configureHttpAuth(
  tokenGetter: () => string | null,
  refreshHandler: () => Promise<string | null>,
): void {
  getAccessToken = tokenGetter
  refreshAccessToken = refreshHandler
}

export async function http<T>(path: string, options: RequestInit = {}, canRefresh = true): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  const token = getAccessToken()
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${baseUrl}${path}`, { ...options, headers })

  if (response.status === 401 && canRefresh && refreshAccessToken) {
    const newToken = await refreshAccessToken()
    if (newToken) return http<T>(path, options, false)
  }

  if (!response.ok) {
    throw new HttpError(response.status, `Помилка API: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
