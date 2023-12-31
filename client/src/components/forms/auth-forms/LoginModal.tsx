import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { IAccessCodeInput } from '../../../../@types.birthday'
import { loginAccessCodeRequired } from '../../../helpers/formRegisterConfig'

import { useNavigate } from 'react-router-dom'
import { axiosBase, handleAxiosError } from '../../../helpers/api/axios'

import useAuth from '../../../hooks/useAuth'
import useNotification from '../../../hooks/useNotification'
import useSignUpLogin from '../../../hooks/useSignUpLogin'

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'

export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState } = useForm<IAccessCodeInput>()
  const { errors } = formState

  const navigate = useNavigate()
  const { setAccessToken, setStatus } = useAuth()
  const { email, setEmail } = useSignUpLogin()
  const { handleNotification } = useNotification()

  const onSubmitAccessCode = async (formData: IAccessCodeInput) => {
    handleNotification.show('info', 'Submitting access code')
    try {
      const res = await axiosBase.get(`auth/login/${email}/${formData.accessCode}`)

      setEmail('')
      setAccessToken(res.data.accessToken)
      setStatus(true)

      navigate('/')
      handleNotification.show('success', `Login successfull`)
    } catch (e) {
      setStatus(false)
      handleNotification.show('error', handleAxiosError(e))
    }
  }

  // Open the modal on render
  useEffect(() => {
    onOpen()
    return onClose
  }, [onOpen, onClose])

  if (!email) return null

  return createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmitAccessCode)}>
            <FormControl isInvalid={!!errors.accessCode}>
              <FormLabel htmlFor="accessCode">Enter 4 digits access code</FormLabel>
              <Input
                id="accessCode"
                {...register('accessCode', loginAccessCodeRequired)}
              />
              <FormErrorMessage>{errors.accessCode?.message}</FormErrorMessage>
            </FormControl>
            <Button variant="teal" type="submit">
              SUBMIT ACCESS CODE
            </Button>
          </form>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose()
                navigate('/')
              }}
            >
              Exit
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>,
    document.getElementById('login-modal') as HTMLElement
  )
}
