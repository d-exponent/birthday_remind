import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

// Providers
import { AuthProvider } from './context/authContext'
import { NotificationProvider } from './context/notificationContext'

// Loaders
import { loadUserBirthdays } from './helpers/loaders'

// Components
import App from './App'
import Protect from './components/Protect'
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

      <Route element={<Protect roles={['*']} />}>
        <Route
          path="profile/:userId"
          loader={loadUserBirthdays}
          element={<UserProfile />}
        />
      </Route>

      <Route path="unauthorized" element={<Unauthorized />} />
    </Route>
  )
)

root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  </ChakraProvider>
  // </React.StrictMode>
)
