import { IReactChildrenProps } from '../../../@types.birthday'

const Layout = (props: IReactChildrenProps) => {
  return (
    <>
      <header>This will be the header</header>
      {props.children}
    </>
  )
}

export default Layout
