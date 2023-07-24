import axios from 'axios'
import { IAbortConfigParams } from '../../../@types.birthday'

export const axiosBase = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true
})

export const axiosAbort = ({ url, method, config }: IAbortConfigParams) => {
  const controller = new AbortController()
  let abortConfig = { signal: controller.signal }

  if (config) abortConfig = { ...abortConfig, ...config }

  return {
    promise: axiosBase[method ? method : 'get'](url, abortConfig),
    abort: controller.abort.bind(controller)
  }
}
