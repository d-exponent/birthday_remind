import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useSignUpLogin from '../../../hooks/useSignUpLogin'
import { axiosBase } from '../../../helpers/api/axios'
import useNotification from '../../../hooks/useNotification'

import { IRegistrationFormData } from '../../../../@types.birthday'
import {
  emailRequired,
  nameRequired,
  phoneRequired
} from '../../../helpers/formRegisterConfig'

const SignUp = () => {
  const { setContent } = useNotification()
  const { handleSubmit, register, formState } = useForm<IRegistrationFormData>()
  const { errors, isSubmitting } = formState

  const { setEmail } = useSignUpLogin()

  const onSubmit = async (formData: IRegistrationFormData) => {
    try {
      setContent.show('info', 'Signing up')
      const { data } = await axiosBase.post('/users/me/sign-up', formData)
      setContent.show('success', data.message)
      setEmail(data.data.email)
    } catch (e) {
      setContent.show('error', e.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email || errors.phone || errors.name}>
        <Box>
          <Input placeholder="Full names" {...register('name', nameRequired)} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </Box>

        <Box>
          <Input placeholder="Email address" {...register('email', emailRequired)} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </Box>

        <Box>
          <Input placeholder="Phone number" {...register('phone', phoneRequired)} />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </Box>
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Register
      </Button>
    </form>
  )
}

export default SignUp
