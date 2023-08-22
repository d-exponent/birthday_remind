import axios from 'axios'
import { IAbortConfigParams } from '../../../@types.birthday'

export const axiosBase = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
})

export const axiosAbort = ({ url, method, config }: IAbortConfigParams) => {
  const controller = new AbortController()
  return {
    promise: axiosBase[method || 'get'](url, {
      signal: controller.signal,
      ...config
    }),
    abort: controller.abort.bind(controller)
  }
}

export const axiosRefresh = (parmas = {}) =>
  axiosAbort({ url: 'auth/refresh', config: { withCredentials: true, ...parmas } })

export const handleAxiosError = (e: unknown) => {
  const genericMessage = 'Something went wrong 😥'
  if (axios.isAxiosError(e)) {
    return e.response?.data.message || genericMessage
  }
  return genericMessage
}
