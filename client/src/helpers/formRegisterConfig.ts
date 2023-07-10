export const nameRequired = { required: 'The name is required' }

export const phoneOptional = {
  pattern: {
    value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    message: 'Invalid phone format (example valid format: +333#########)'
  }
}

export const phoneRequired = {
  ...phoneOptional,
  required: 'Phone number is required'
}

export const emailOptional = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format (example valid format: foo@bar.com)'
  }
}

export const emailRequired = {
  ...emailOptional,
  required: 'Email address is required'
}

export const loginAccessCodeRequired = {
  required: 'The access code is required',
  minLength: {
    value: 4,
    message: 'the access must be four(4) numeric values eg(1234)'
  },
  maxLength: {
    value: 4,
    message: 'the access must be four(4) numeric values eg(1234)'
  }
}
