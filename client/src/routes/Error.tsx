import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

function Error() {
  const error = useRouteError()
  let errorMessage

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div>
      <h1>Something isn't right 🤔</h1>
      <p>Our apologies, it seems Something went wrong </p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}

export default Error
