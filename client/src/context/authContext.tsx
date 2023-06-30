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

  useEffect(() => {
    if (status === null) {
      const { promise, abort } = axiosAbort({ url: '/auth/refresh' })

      promise
        .then(({ data: { accessToken } }) => {
          setAccessToken(accessToken)
          setStatus(true)
        })
        .catch(() => setStatus(false))
      return abort

    }

    if (accessToken && status === true && user === null) {
      const { promise, abort } = axiosAbort({
        url: '/users/me',
        config: { headers: { Authorization: `Bearer ${accessToken}` } }
      })

      promise
        .then(({ data: { data } }) => setUser(data))
        .catch((e) => console.error(e))

      return abort
    }
  }, [accessToken, status, user])

  const authContextValues = {
    user,
    status,
    setAccessToken
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
