import { birthday } from '../../@types.birthday'

const currentYear = new Date().getFullYear()

const Birthday = (birthday: birthday) => {
  const formattedDate = new Date(currentYear, birthday.month - 1, birthday.day)

  return (
    <li>
      <h3>
        Celebrant: <span>{birthday.name}</span>
      </h3>
      <p>
        Birthday:
        <span>
          {formattedDate.toLocaleDateString('en-Us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </p>
      {birthday.email ? (
        <p>
          Email: <span>{birthday.email}</span>
        </p>
      ) : null}
      {birthday.phone ? (
        <p>
          Phone Number: <span>{birthday.phone}</span>
        </p>
      ) : null}
    </li>
  )
}

export default Birthday
