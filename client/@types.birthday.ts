import { ReactElement } from 'react'
import Notifification from './src/helpers/notification'

export interface IEmailInput {
  email: string
}

// Registration Form Input Interface
export interface IRegistrationFormData extends IEmailInput {
  name: string
  phone: string
}

export interface IAddBirtdayFormdata {
  name: string
  day: number
  month: number
  phone?: string
  email?: string
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

// LOGIN MODAL
export interface ILoginModalProps {
  onSubmit(formdata: IAccessCodeInput): void
  closeModal(): void
}

export interface IAbortConfigParams {
  url: string
  method?: 'get' | 'post' | 'patch' | 'delete'
  config?: object
}

export interface IProtectedRoute {
  roles: string[]
}

// AuthContext
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
  accessToken: string
  setAccessToken(token: string | null): void
}

// Notification Context
export type notificationStatus = 'error' | 'info' | 'success'
export interface INotificationContent {
  status: notificationStatus
  message: string
}

export type notificationContent = INotificationContent | null
export type setNotification = (notification: notificationContent) => void

export interface INotificationContextValue {
  content: notificationContent
  setContent: Notifification
}
