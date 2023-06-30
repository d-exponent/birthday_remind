import { ReactElement } from 'react'

export interface IEmailInput {
  email: string
}

// Registration Form Input Interface
export interface IRegistrationFormData extends IEmailInput {
  name: string
  phone: string
}

export interface IAccessCodeInput {
  accessCode: string
}

export interface IReactChildrenProps {
  children: ReactElement | ReactElement[]
}

export interface IUserAuthFormsProps {
  onSuccess(userId: string): void
  onError(): void
}

export interface IAbortConfigParams {
  url: string
  method?: 'get' | 'post' | 'patch' | 'delete'
  config?: object
}

export interface IProtectedRoute {
  roles: string[]
}

export interface IUser {
  id: string
  name: string
  phone?: string
  email: string
  role: string
}

export interface IAuthContextType {
  user: IUser | null
  status: boolean | null
  setAccessToken(token: string | null): void
}
