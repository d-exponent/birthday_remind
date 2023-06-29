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
