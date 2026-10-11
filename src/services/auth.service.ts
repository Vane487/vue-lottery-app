import { http } from '@/api/http-client'
import type { AuthSession, User } from '@/types/user'

export class AuthService {
  login(username: string, password: string): Promise<AuthSession> {
    return http<AuthSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    })
  }

  getCurrentUser(): Promise<User> {
    return http<User>('/auth/me')
  }

  refresh(refreshToken: string): Promise<Pick<AuthSession, 'accessToken' | 'refreshToken'>> {
    return http<Pick<AuthSession, 'accessToken' | 'refreshToken'>>(
      '/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
      },
      false,
    )
  }
}
