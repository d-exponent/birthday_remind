import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ProtectedLink from './ProtectedLink'

const Header = () => {
  const { status } = useAuth()
  console.log(useAuth())
 
  return (
    <header>
      {/* TODO: EMBED LINK IN A LOGO */}
      <NavLink to="/">HOME</NavLink>
      <nav>
        <>
          {status === false && <NavLink to="/auth">Auth</NavLink>}
          <ProtectedLink to='/profile' text="Profile" />
          <ProtectedLink to="/birthday" text="New Birthday" />
        </>
      </nav>
    </header>
  )
}

export default Header
