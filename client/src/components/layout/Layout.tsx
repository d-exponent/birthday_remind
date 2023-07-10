import Header from './Header'
import { IReactChildrenProps } from '../../../@types.birthday'
import '../../styles/layout.css'

const Layout = (props: IReactChildrenProps) => {
  return (
    <>
      <Header/>
      <main className="container">{props.children}</main>
    </>
  )
}

export default Layout
