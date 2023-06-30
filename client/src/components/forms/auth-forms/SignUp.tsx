import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { axiosBase } from '../../../helpers/api/axios'

import {
  IRegistrationFormData,
  IUserAuthFormsProps
} from '../../../../@types.birthday'
import {
  emailRegisterOption,
  nameRegisterOption,
  phoneRegisterOption
} from '../../../helpers/registerOptions'

export default function SignUp(props: IUserAuthFormsProps) {
  const { handleSubmit, register, formState } = useForm<IRegistrationFormData>()
  const { errors, isSubmitting } = formState

  const onSubmit = async (formData: IRegistrationFormData): Promise<void> => {
    try {
      const { data } = await axiosBase.post('/users/me/sign-up', formData)
      props.onSuccess(data.data.email)
    } catch (e) {
      props.onError()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email || errors.phone || errors.name}>
        <Box>
          <Input
            placeholder="Full names"
            {...register('name', nameRegisterOption)}
          />
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
  )
}
