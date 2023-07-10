import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { IProtectedRoute } from '../../@types.birthday'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'

const Protect = (props: IProtectedRoute) => {
  const auth = useAuth()
  const location = useLocation()
  const { setContent } = useNotification()
  const navigationState = { from: location }
  const userRole = auth?.user?.role || ''

  switch (true) {
    case userRole && (props.roles[0] === '*' || props.roles.includes(userRole)):
      return <Outlet />

    case auth?.user !== null:
      setContent.show('error', 'You are not authorized to this page')
      return <Navigate to="/unauthorized" state={navigationState} replace />

    default:
      setContent.show(
        'error',
        'Authentication failed!. Please login or register'
      )
      return <Navigate to="/auth" state={navigationState} replace />
  }
}

export default Protect
