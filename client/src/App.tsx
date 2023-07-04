import { Outlet } from 'react-router-dom'
import Layout from './components/ui/Layout'
import Notifification from './components/ui/Notification'

const App = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <Notifification />
    </>
  )
}

export default App
