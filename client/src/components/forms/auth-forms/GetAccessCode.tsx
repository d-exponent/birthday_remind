import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { emailRegisterOption } from '../../../helpers/registerOptions'
import { IEmailInput } from '../../../types'

interface GetAccessCodeProps {
  onSubmit(formData: IEmailInput): void
}

export default function GetAccessCode(props: GetAccessCodeProps) {
  const { handleSubmit, register, formState } = useForm<IEmailInput>()
  const { errors } = formState

  return (
    <Box>
      <form onSubmit={handleSubmit(props.onSubmit)}>
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
