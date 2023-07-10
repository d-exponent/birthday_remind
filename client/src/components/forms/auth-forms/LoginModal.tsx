import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IAccessCodeInput, ILoginModalProps } from '../../../../@types.birthday'
import { loginAccessCodeRequired } from '../../../helpers/formRegisterConfig'

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

export default function Login(props: ILoginModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState } = useForm<IAccessCodeInput>()
  const { errors } = formState

  // Open the modal on render
  useEffect(() => {
    onOpen()
    return () => onClose()
  }, [onOpen, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        /**/
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <FormControl isInvalid={errors.accessCode}>
              <FormLabel htmlFor="accessCode">
                Enter 4 digits access code
              </FormLabel>
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
            <Button onClick={props.closeModal}>Exit</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
