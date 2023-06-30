import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import { AuthProvider } from './context/authContext'
import './index.css'

import App from './App'
import Protect from './components/protect/Protect'
import Authentication from './routes/Authentication'
import Birthday from './routes/Birthday'
import Error from './routes/Error'
import Unauthorized from './routes/Unauthorized'
import UserProfile from './routes/UserProfile'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route path="auth" element={<Authentication />} />

      <Route element={<Protect roles={['user']} />}>
        <Route path="birthday" element={<Birthday />} />
      </Route>

      <Route element={<Protect roles={['user']} />}>
        <Route path="profile" element={<UserProfile />} />
      </Route>

      <Route path="unauthorized" element={<Unauthorized />} />
    </Route>
  )
)

root.render(
  // <React.StrictMode>
  <AuthProvider>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </AuthProvider>
  // </React.StrictMode>
)
