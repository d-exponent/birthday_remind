import { createContext, useEffect, useState } from 'react'
import { IAuthContextType, IReactChildrenProps, IUser } from '../../@types.birthday'
import { axiosAbort } from '../helpers/api/axios'

type accessToken = string | null
type user = IUser | null
type status = boolean | null

const AuthContext = createContext<IAuthContextType | null>(null)

export function AuthProvider(props: IReactChildrenProps) {
  const [user, setUser] = useState<user>(null)
  const [accessToken, setAccessToken] = useState<accessToken>(null)
  const [status, setStatus] = useState<status>(null)
  const [triggerAuth, setTriggerAuth] = useState(false)

  useEffect(() => {
    if (triggerAuth || status === null) {
      const { promise, abort } = axiosAbort({ url: '/auth/refresh' })

      promise
        .then(({ data: { accessToken } }) => {
          setAccessToken(accessToken)
          setStatus(true)
          setTriggerAuth(false)
        })
        .catch(() => setStatus(false))
      return abort
    }

    if (accessToken && status === true && user === null) {
      const { promise, abort } = axiosAbort({
        url: '/users/me',
        config: {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      })

      promise
        .then(({ data: { data } }) => setUser(data))
        .catch(e => console.error(e))

      return abort
    }
  }, [accessToken, status, user, triggerAuth])

  const authContextValue: IAuthContextType = {
    user,
    status,
    accessToken: accessToken ? accessToken : '',
    setAccessToken,
    setTriggerAuth
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
