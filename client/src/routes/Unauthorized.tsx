import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  const goback = () => navigate(-1)
  return (
    <div>
      <h3>You don't have access </h3>
      <button onClick={goback} type="button">
        Go back
      </button>
    </div>
  )
}

export default Unauthorized
