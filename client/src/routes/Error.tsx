import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  let errorMessage

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  return (
    <div>
      <h1>Something isn't right 😪</h1>
      <p>Our apologies, it seems Something went wrong </p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}

export default Error
