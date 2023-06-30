import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { IEmailInput, IUserAuthFormsProps } from '../../../../@types.birthday'
import { axiosBase } from '../../../helpers/api/axios'
import { emailRegisterOption } from '../../../helpers/registerOptions'

export default function GetAccessCode(props: IUserAuthFormsProps) {
  const { handleSubmit, register, formState } = useForm<IEmailInput>()
  const { errors } = formState

  const onSubmit = async ({ email }: IEmailInput): Promise<void> => {
    try {
      await axiosBase.get(`/auth/${email}`)
      props.onSuccess(email)
    } catch (e) {
      props.onError()
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <Input
            placeholder="Email address"
            {...register('email', emailRegisterOption)}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit">Get Access Code</Button>
      </form>
    </Box>
  )
}
