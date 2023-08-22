import { useEffect } from 'react'
import { axiosBase, axiosRefresh } from '../helpers/api/axios'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const { accessToken } = useAuth()

  useEffect(() => {
    if (accessToken) {
      const requestInterceptor = axiosBase.interceptors.request.use(request => {
        if (!request.headers['Authorization']) {
          request.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return request
      })

      return () => axiosBase.interceptors.request.eject(requestInterceptor)
    }
  }, [accessToken])

  useEffect(() => {
    let aborter: ((reason?: unknown) => void) | null = null

    const responseInterceptor = axiosBase.interceptors.response.use(
      response => response,
      async error => {
        // Add a new access token on first 401 status server response
        const originalRequest = error?.config
        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true
          let newAccessToken: string | null = null

          const refresh = axiosRefresh()

          try {
            const res = await refresh.promise
            newAccessToken = res.data.accessToken
            aborter = refresh.abort
          } catch (e) {
            /**Empty block */
          }

          if (newAccessToken !== null)
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return axiosBase(originalRequest) //One more time champ!
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosBase.interceptors.response.eject(responseInterceptor)
      if (aborter) aborter()
    }
  }, [])

  return axiosBase
}

export default useAxiosPrivate
