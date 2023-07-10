import { useEffect } from 'react'
import { axiosBase } from '../helpers/api/axios'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = () => {
  const { accessToken } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const requestInterceptor = axiosBase.interceptors.request.use(
      config => {
        config.headers['Content-Type'] = 'application/json'
        // Add accessToken to all request config if not set
        if (!config.headers['Authorization'] && accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    const responseInterceptor = axiosBase.interceptors.response.use(
      response => response,
      async error => {
        // Add a new access token on first 401 status server response
        const originalRequest = error?.config
        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true
          const newAccessToken = await refresh()

          if (newAccessToken) {
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`
          }
          return axiosBase(originalRequest) //One more time champ!
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosBase.interceptors.response.eject(responseInterceptor)
      axiosBase.interceptors.request.eject(requestInterceptor)
    }
  }, [refresh, accessToken])

  return axiosBase
}

export default useAxiosPrivate
