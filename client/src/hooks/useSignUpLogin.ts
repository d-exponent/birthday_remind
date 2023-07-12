import { useContext } from 'react'
import SignUpLoginContext from '../context/SignupLoginContext'
import { ISignUpLoginContext } from '../../@types.birthday'

const useSignUpLogin = () =>
  useContext(SignUpLoginContext) as ISignUpLoginContext

export default useSignUpLogin
