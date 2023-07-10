import { Outlet } from 'react-router-dom'
import Notifification from './components/Notification'
import Layout from './components/layout/Layout'

import './App.css'

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
      <Notifification />
    </div>
  )
}

export default App
