import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IAccessCodeInput } from '../../../../@types.birthday'
import { accessCodeRegisterOption } from '../../../helpers/registerOptions'

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

interface LoginModalProps {
  onSubmit(formdata: IAccessCodeInput): void
  closeModal(): void
}

export default function SubmitAccessCodeModal(props: LoginModalProps) {
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
              <FormLabel htmlFor="accessCode">Enter 4 digits access code</FormLabel>
              <Input
                id="accessCode"
                {...register('accessCode', accessCodeRegisterOption)}
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
