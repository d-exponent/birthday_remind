import useAuth from './useAuth'
import { axiosBase } from '../helpers/api/axios'

const useRefreshToken = () => {
  const { setAccessToken } = useAuth()

  const refresh = async (): Promise<string | null> => {
    try {
      const { data } = await axiosBase.get('auth/refresh')
      setAccessToken(data.accessToken)
      return data.accessToken
    } catch (e) {
      setAccessToken(null)
      return null
    }
  }

  return refresh
}

export default useRefreshToken
