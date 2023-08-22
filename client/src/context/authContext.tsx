import { createContext, useEffect, useState } from 'react'
import { IAuthContextType, IReactChildrenProps, IUser } from '../../@types.birthday'
import { axiosAbort, axiosRefresh } from '../helpers/api/axios'

const AuthContext = createContext<IAuthContextType | null>(null)

export function AuthProvider(props: IReactChildrenProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const [status, setStatus] = useState<boolean | null>(null)
  const [accessToken, setAccessToken] = useState<string>('')

  useEffect(() => {
    if (status === null) {
      const { promise, abort } = axiosRefresh()

      promise
        .then(res => {
          setAccessToken(res.data.accessToken)
          setStatus(true)
        })
        .catch(() => setStatus(false))

      return () => abort()
    }
  }, [status])

  useEffect(() => {
    if (accessToken && user === null) {
      const { promise, abort } = axiosAbort({
        url: '/users/me',
        config: { headers: { Authorization: `Bearer ${accessToken}` } }
      })

      promise.then(res => setUser(res.data.data)).catch(e => console.error(e))

      return () => abort()
    }
  }, [accessToken, user])

  const authContextValue: IAuthContextType = {
    user,
    status,
    accessToken,
    setStatus: (stat: boolean) => setStatus(stat),
    setAccessToken: (token: string) => setAccessToken(token)
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
