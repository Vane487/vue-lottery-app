import { http } from '@/shared/api'
import type { AuthSession } from '../model/types'

export class AuthService {
  login(username: string, password: string): Promise<AuthSession> {
    return http<AuthSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    })
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
