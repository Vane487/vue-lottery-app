export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  image?: string
  birthDate?: string
  address?: {
    address: string
    city: string
    country: string
  }
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  age: number
  gender: string
  phone: string
}

export type UpdateUserDto = Partial<CreateUserDto>

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
