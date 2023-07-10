import { axiosBase } from './api/axios'

export const loadUserBirthdays = async () => {
  try {
    const res = await axiosBase.get(`users/me/birthdays?limit=20`)
    return res.data.data
  } catch (e) {
    return []
  }
}
