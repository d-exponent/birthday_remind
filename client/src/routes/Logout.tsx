import { axiosBase } from '../helpers/api/axios'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'

function Logout() {
  const { logOut } = useAuth()
  const { setContent } = useNotification()

  const handleLogout = async () => {
    setContent.show('info', 'Logging out')
    try {
      await axiosBase.get('auth/logout')
      setContent.show('success', 'Log out success')
      logOut()
    } catch (e) {
      setContent.show('error', 'Something went wrong')
    }
  }

  return <div onClick={handleLogout}>Logout</div>
}

export default Logout
