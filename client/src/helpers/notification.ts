import { setNotification, notificationStatus } from '../../@types.birthday'

class Notifification {
  constructor(private setNotification: setNotification) {
    this.setNotification = setNotification
  }

  hide() {
    this.setNotification(null)
  }

  show(status: notificationStatus, message: string) {
    this.setNotification({ status, message })
  }
}

export default Notifification
