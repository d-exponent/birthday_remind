import { createContext, useEffect, useMemo, useState } from 'react'
import {
  INotificationContextValue,
  IReactChildrenProps,
  notificationContent
} from '../../@types.birthday'
import Notifification from '../helpers/notification'

const NotificationContext = createContext<INotificationContextValue | null>(
  null
)

export const NotificationProvider = (props: IReactChildrenProps) => {
  const [notifcation, setNotification] = useState<notificationContent>(null)

  const appNotification = useMemo(
    () => new Notifification(setNotification),
    [setNotification]
  )

  // Hide notification after five seconds
  useEffect(() => {
    const timeOut = setTimeout(() => {
      appNotification.hide()
    }, 5000)
    return () => clearTimeout(timeOut)
  }, [notifcation, appNotification])

  const notificationContextValue = {
    content: notifcation,
    setContent: appNotification
  }

  return (
    <>
      <NotificationContext.Provider value={notificationContextValue}>
        {props.children}
      </NotificationContext.Provider>
    </>
  )
}

export default NotificationContext
