export type CreateUserData = {
  firstName: string
  lastName: string
  aka: string | null
  email: string
  password: string
}

export type UserResponse = {
  id: string
  firstName: string
  lastName: string
  aka: string | null
  email: string
  createdAt: Date
  updatedAt: Date
}
