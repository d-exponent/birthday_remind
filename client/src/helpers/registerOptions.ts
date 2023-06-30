// Register Options
export const nameRegisterOption = { required: 'Your name is required' }

export const phoneRegisterOption = {
  require: 'Phone number is required',
  pattern: {
    value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    message: 'Invalid phone format (example valid format: +333#########)'
  }
}

export const emailRegisterOption = {
  required: 'Email address is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format (example valid format: foo@bar.com)'
  }
}

export const accessCodeRegisterOption = {
  required: 'The access code is required',
  minLength: {
    value: 4,
    message: 'the access code is only fout (4) digits'
  },
  maxLength: {
    value: 4,
    message: 'the access code is only fout (4) digits'
  }
}
