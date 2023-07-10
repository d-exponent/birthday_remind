import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

interface ILinkProps {
  to: string
  text: string
}

const ProtectedLink = (props: ILinkProps) => {
  const { status } = useAuth()

  if (!status) return null

  return <NavLink to={props.to}>{props.text}</NavLink>
}

export default ProtectedLink
