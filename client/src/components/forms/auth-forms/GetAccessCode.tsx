import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useNotification from '../../../hooks/useNotification'
import useSignUpLogin from '../../../hooks/useSignUpLogin'

import { IEmailInput } from '../../../../@types.birthday'
import { axiosBase, handleAxiosError } from '../../../helpers/api/axios'
import { emailRequired } from '../../../helpers/formRegisterConfig'

export default function GetAccessCode() {
  const { setEmail } = useSignUpLogin()
  const { handleNotification } = useNotification()
  const { handleSubmit, register, formState } = useForm<IEmailInput>()

  const { errors } = formState

  const onSubmit = async ({ email }: IEmailInput) => {
    handleNotification.show('info', `sending access code to ${email} `)
    try {
      const res = await axiosBase.get(`/auth/${email}`)
      handleNotification.show('success', res.data.message)
      setEmail(email.toLowerCase())
    } catch (e) {
      handleNotification.show('error', handleAxiosError(e))
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <Input placeholder="Email address" {...register('email', emailRequired)} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit">Get Access Code</Button>
      </form>
    </Box>
  )
}
