import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Birthdays from '../components/Birthdays'

const UserProfile = () => {
  const [myBirthdays, setMyBirthdays] = useState([])
  const { user, status } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate
      .get('users/me/birthdays?limit=20')
      .then(res => {
        setMyBirthdays(res.data.data)
      })
      .catch(e => console.error(e))
  }, [axiosPrivate])

  if (user === null) return <div>Loading</div>

  if (status === false) return <Navigate to="/log-in" replace />

  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.phone ? <p>{user.phone}</p> : null}
      <div>
        {myBirthdays.length > 0 ? (
          <Birthdays birthdays={myBirthdays} />
        ) : (
          <div>
            You have no saved birthdays yet
            <div>
              <Link to="/birthday">Add a new birthday</Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserProfile
