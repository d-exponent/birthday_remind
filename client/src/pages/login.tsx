import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { IAccessCodeInput, IEmailInput } from '../types'

import GetAccessCode from '../components/forms/auth-forms/GetAccessCode'
import SubmitAccessCodeModal from '../components/forms/auth-forms/SubmitAccessCodeModal'

let url: string
export default function Login() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleRequestAccessCode = (formdata: IEmailInput): void => {
    url = `https://localhost:5000/api/auth/${formdata.email}`

    // Request accessCode to user email from the server

    // On success : Open modal for user to enter the access code
    setOpenModal(true)

    // On error: Show user the error
  }

  const handleSubmitAccessCode = (formData: IAccessCodeInput): void => {
    url = `https://localhost:5000/api/auth/${formData.accessCode}`
    // Submit access code to server for authentication

    // On Success, store refresh token in memory //Localstorage or cookies

    // On success, store access token or rely on server cookies

    // On error, Notify user of error
  }

  return (
    <Box>
      <GetAccessCode onSubmit={handleRequestAccessCode} />
      {openModal && (
        <SubmitAccessCodeModal
          onSubmit={handleSubmitAccessCode}
          closeModal={() => {
            setOpenModal(false)
          }}
        />
      )}
    </Box>
  )
}
