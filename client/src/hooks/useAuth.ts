import { useContext } from 'react'
import AuthContext from '../context/authContext'
import { IAuthContextType } from '../../@types.birthday'

const useAuth = () => useContext(AuthContext) as IAuthContextType

export default useAuth
