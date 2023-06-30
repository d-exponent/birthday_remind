import { Outlet } from 'react-router-dom'
import Layout from './components/ui/Layout'

const App = () => {
  return (
    <main>
      <Layout>
        <Outlet />
      </Layout>
    </main>
  )
}

export default App
