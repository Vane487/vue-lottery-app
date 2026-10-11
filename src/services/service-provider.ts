import { AuthService } from './auth.service'
import { UserService } from './user.service'

// Компоненти беруть сервіси тут, а не створюють їх через new.
export class ServiceProvider {
  private static userService?: UserService
  private static authService?: AuthService

  static get users(): UserService {
    this.userService ??= new UserService()
    return this.userService
  }

  static get auth(): AuthService {
    this.authService ??= new AuthService()
    return this.authService
  }
}
