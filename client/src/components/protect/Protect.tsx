import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { IProtectedRoute } from '../../../@types.birthday'

const Protect = (props: IProtectedRoute) => {
  const auth = useAuth()
  const location = useLocation()
  const navigationState = { from: location }
  const userRole = auth?.user?.role ? auth.user.role : ''

  return props.roles.includes(userRole) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={navigationState} replace />
  ) : (
    <Navigate to="/auth" state={navigationState} replace />
  )
}

export default Protect
