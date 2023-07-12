import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import GetAccessCode from './forms/auth-forms/GetAccessCode'
import SignUp from './forms/auth-forms/SignUp'
import { Button } from '@chakra-ui/react'

export default function UserAuth() {
  const { pathname } = useLocation()
  const [focusOnSignUp, setFocusOnSignUp] = useState<boolean | null>(null)

  useEffect(() => {
    setFocusOnSignUp(pathname === 'sign-up')
  }, [pathname])

  if (focusOnSignUp === null) return <div>Loading</div>

  return (
    <div>
      <Button onClick={() => setFocusOnSignUp(prev => !prev)}>Toggle</Button>
      {focusOnSignUp ? <SignUp /> : <GetAccessCode />}
    </div>
  )
}
