import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import {
  emailRegisterOption,
  nameRegisterOption,
  phoneRegisterOption
} from '../../../helpers/registerOptions'
import { IRegistrationFormData } from '../../../types'

export default function Register() {
  const { handleSubmit, register, formState } = useForm<IRegistrationFormData>()
  const { errors, isSubmitting } = formState

  const onSubmit = (formData: IRegistrationFormData): void => {
    const url = 'https://localhost:5000/api/users/me/sign-up'
  
    // Submit user data to Server

    // On success Redirect user to login page

    // Find a way to pop the modal so user can enter the access code received in their email

    // On Error: Show user the error message

  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name || errors.email || errors.phone}>
          <Box>
            <Input placeholder="Full names" {...register('name', nameRegisterOption)} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </Box>

          <Box>
            <Input
              placeholder="Email address"
              {...register('email', emailRegisterOption)}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </Box>

          <Box>
            <Input
              placeholder="Phone number"
              {...register('phone', phoneRegisterOption)}
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </Box>
        </FormControl>
        <Button type="submit" isLoading={isSubmitting}>
          Register
        </Button>
      </form>
    </Box>
  )
}
