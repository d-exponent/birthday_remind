import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import MyLink from './MyLink'

const Header = () => {
  const { status } = useAuth()

  return (
    <header>
      {/* TODO: EMBED LINK IN A LOGO */}
      <NavLink to="/">HOME</NavLink>
      <nav>
        <>
          {!status && <MyLink to="/log-in" text="Login" />}
          {!status && <MyLink to="/sign-up" text="Sign up" />}
          <MyLink to="/profile" text="Profile" protect={true} />
          <MyLink to="/birthday" text="New Birthday" protect={true} />
        </>
      </nav>
    </header>
  )
}

export default Header
