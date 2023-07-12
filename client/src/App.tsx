import { Outlet } from 'react-router-dom'
import Notifification from './components/Notification'
import LoginModal from './components/forms/auth-forms/LoginModal'
import Layout from './components/layout/Layout'

import './App.css'

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
      <Notifification />
      <LoginModal />
    </div>
  )
}

export default App
