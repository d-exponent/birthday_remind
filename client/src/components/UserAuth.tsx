import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { axiosBase } from '../helpers/api/axios'
import useNotification from '../hooks/useNotification'

import GetAccessCode from './forms/auth-forms/GetAccessCode'
import LoginModal from './forms/auth-forms/LoginModal'
import SignUp from './forms/auth-forms/SignUp'

import { IAccessCodeInput } from '../../@types.birthday'

export default function UserAuth() {
  const [userEmail, setUserEmail] = useState<string>('')
  const { setContent } = useNotification()
  const [showGetAccessCode, setShowGetAccessCode] = useState<boolean>(true)
  const [showSubmitAccessCode, setShowSubmitAccessCode] =
    useState<boolean>(false)

  const onSuccess = (userEmail: string) => {
    setUserEmail(userEmail)
    setShowSubmitAccessCode(true)
  }

  const onError = () => {
    // Still working on what to do
  }

  const toggleShowGetAccessCode = () => {
    setShowGetAccessCode(prevState => !prevState)
  }

  const onSubmitAccessCode = async (formData: IAccessCodeInput) => {
    setContent.show('info', 'Submitting access code')
    try {
      await axiosBase.get(`/auth/login/${userEmail}/${formData.accessCode}`)
      setContent.show('success', `Login successfull`)
      // TODO: REDIRECT USER TO HOME PAGE OR ADD BIRTHDAY PAGE
    } catch (e) {
      setContent.show('error', e.response.data.message)
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
        <LoginModal
          onSubmit={onSubmitAccessCode}
          closeModal={() => setShowSubmitAccessCode(false)}
        />
      )}
    </div>
  )
}
