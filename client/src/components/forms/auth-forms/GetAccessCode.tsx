import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { IEmailInput } from '../../../../@types.birthday'
import { axiosBase } from '../../../helpers/api/axios'
import { emailRequired } from '../../../helpers/formRegisterConfig'

import useNotification from '../../../hooks/useNotification'
import useSignUpLogin from '../../../hooks/useSignUpLogin'

export default function GetAccessCode() {
  const { setContent } = useNotification()
  const { setEmail } = useSignUpLogin()

  const { handleSubmit, register, formState } = useForm<IEmailInput>()
  const { errors } = formState

  const onSubmit = async ({ email }: IEmailInput) => {
    setContent.show('info', `sending access code to ${email} `)
    try {
      const res = await axiosBase.get(`/auth/${email}`)
      setContent.show('success', res.data.message)
      setEmail(email.toLowerCase())
    } catch (e) {
      setContent.show('error', e.response.data.message)
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <Input placeholder="Email address" {...register('email', emailRequired)} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit">Get Access Code</Button>
      </form>
    </Box>
  )
}
