export interface AuthSession {
  accessToken: string
  refreshToken: string
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  image?: string
}

export interface SessionUser {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  image?: string
}
