import { createContext, useState } from 'react'
import { IReactChildrenProps, ISignUpLoginContext } from '../../@types.birthday'

const SignUpLoginContext = createContext<ISignUpLoginContext | null>(null)

export const SignUpLoginProvider = (props: IReactChildrenProps) => {
  const [userEmail, setUserEmail] = useState('')

  const contextValue: ISignUpLoginContext = {
    email: userEmail,
    setEmail: (email: string) => setUserEmail(email)
  }

  return (
    <SignUpLoginContext.Provider value={contextValue}>
      {props.children}
    </SignUpLoginContext.Provider>
  )
}

export default SignUpLoginContext
