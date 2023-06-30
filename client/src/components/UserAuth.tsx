import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { axiosBase } from '../helpers/api/axios'

import GetAccessCode from './forms/auth-forms/GetAccessCode'
import SignUp from './forms/auth-forms/SignUp'
import SubmitAccessCodeModal from './forms/auth-forms/SubmitAccessCodeModal'

import { IAccessCodeInput } from '../../@types.birthday'

export default function UserAuth() {
  const [userEmail, setUserEmail] = useState<string>('')
  const [showGetAccessCode, setShowGetAccessCode] = useState<boolean>(true)
  const [showSubmitAccessCode, setShowSubmitAccessCode] = useState<boolean>(false)

  const onSuccess = (userEmail: string) => {
    setUserEmail(userEmail)
    setShowSubmitAccessCode(true)
  }

  const onError = () => {
    // Still working on what to do
  }

  const toggleShowGetAccessCode = () => {
    setShowGetAccessCode((prevState) => !prevState)
  }

  const onSubmitAccessCode = async (formData: IAccessCodeInput): Promise<void> => {
    try {
      await axiosBase.get(`/auth/login/${userEmail}/${formData.accessCode}`)
      // TODO: REDIRECT USER TO HOME PAGE OR ADD BIRTHDAY PAGE
    } catch (error) {
      // NOTIFY USER OF ERROR
    }
  }

  const formProps = { onSuccess, onError }

  return (
    <div>
      {showGetAccessCode ? (
        <GetAccessCode {...formProps} />
      ) : (
        <SignUp {...formProps} />
      )}

      <Button onClick={toggleShowGetAccessCode}>
        {showGetAccessCode ? 'Sign up here' : 'Login'}
      </Button>

      {showSubmitAccessCode && (
        <SubmitAccessCodeModal
          onSubmit={onSubmitAccessCode}
          closeModal={() => setShowSubmitAccessCode(false)}
        />
      )}
    </div>
  )
}
