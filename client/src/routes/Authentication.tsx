import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

import GetAccessCode from '../components/forms/auth-forms/GetAccessCode'
import SignUp from '../components/forms/auth-forms/SignUp'

export default function UserAuth() {
  const { pathname } = useLocation()
  const [focusOnSignUp, setFocusOnSignUp] = useState<boolean | null>(null)

  useEffect(() => {
    setFocusOnSignUp(pathname === '/sign-up')
  }, [pathname])

  if (focusOnSignUp === null) return <div>Loading</div>

  return (
    <div>
      <Button onClick={() => setFocusOnSignUp(prev => !prev)}>Toggle</Button>
      {focusOnSignUp ? <SignUp /> : <GetAccessCode />}
    </div>
  )
}
