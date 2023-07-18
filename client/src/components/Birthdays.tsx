import { nanoid } from 'nanoid'
import Birthday from './Birthday'
import { IBirthdaysProps } from '../../@types.birthday'

const Birthdays = (props: IBirthdaysProps) => (
  <ul>
    {props.birthdays?.map(birthday => (
      <Birthday key={nanoid()} {...birthday} />
    ))}
  </ul>
)

export default Birthdays
