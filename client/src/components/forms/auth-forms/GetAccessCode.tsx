import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { IEmailInput, IUserAuthFormsProps } from '../../../../@types.birthday'
import { axiosBase } from '../../../helpers/api/axios'
import { emailRequired } from '../../../helpers/formRegisterConfig'
import useNotification from '../../../hooks/useNotification'

export default function GetAccessCode(props: IUserAuthFormsProps) {
  const { setContent } = useNotification()

  const { handleSubmit, register, formState } = useForm<IEmailInput>()
  const { errors } = formState

  const onSubmit = async ({ email }: IEmailInput) => {
    setContent.show('info', `sending access code to ${email} `)
    try {
      await axiosBase.get(`/auth/${email}`)
      props.onSuccess(email)
      setContent.show(
        'success',
        `Access code was sent to ${email} successfully `
      )
    } catch (e) {
      props.onError()
      setContent.show('error', e.response.data.message)
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <Input
            placeholder="Email address"
            {...register('email', emailRequired)}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit">Get Access Code</Button>
      </form>
    </Box>
  )
}
