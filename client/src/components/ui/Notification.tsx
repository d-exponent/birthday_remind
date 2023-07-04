import { createPortal } from 'react-dom'
import useNotification from '../../hooks/useNotification'

import '../../styles/notification.css'

const Notifification = () => {
  const { content, } = useNotification()

  if (!content) return null

  return createPortal(
    <p className={`notification ${content.status}`}>{content.message}</p>,
    document.getElementById('notification') as HTMLElement
  )
}

export default Notifification
