import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h3>You don't have access </h3>
      <button onClick={() => navigate(-1)} type="button">
        Go back
      </button>
    </div>
  )
}

export default Unauthorized
