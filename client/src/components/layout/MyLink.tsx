import { NavLink } from 'react-router-dom'

import { ILinkProps } from '../../../@types.birthday'
import useAuth from '../../hooks/useAuth'

const MyLink = (props: ILinkProps) => {
  const { status } = useAuth()

  if (props.protect && !status) return null

  return (
    <NavLink
      to={props.to}
      className={({ isActive, isPending }) =>
        isActive ? 'active' : isPending ? 'pending' : ''
      }
    >
      {props.text}
    </NavLink>
  )
}

export default MyLink
