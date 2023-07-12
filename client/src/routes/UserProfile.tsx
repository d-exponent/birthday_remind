import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function UserProfile() {
  const [myBirthdays, setMyBirthdays] = useState([])
  const { user } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  console.log(myBirthdays)
  useEffect(() => {

    axiosPrivate
      .get('users/me/birthdays?limit=20')
      .then(res => {
        setMyBirthdays(res.data.data)
      })
      .catch(e => console.error(e))

  }, [])

  if (user === null) return <div>Loading</div>

  return <div>THE user profile</div>
}

export default UserProfile
