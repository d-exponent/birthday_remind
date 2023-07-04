import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'
import { INotificationContextValue } from '../../@types.birthday'

const useNotification = () =>
  useContext(NotificationContext) as INotificationContextValue

export default useNotification
