import { axiosBase } from './axios'

const refresh = async (): Promise<string | null> => {
  try {
    const res = await axiosBase.get('auth/refresh')
    return res.data.accessToken
  } catch (e) {
    return null
  }
}

export default refresh
