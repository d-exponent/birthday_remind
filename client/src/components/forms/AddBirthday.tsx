import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useNotification from '../../hooks/useNotification'

import { IAddBirtdayFormdata } from '../../../@types.birthday'
import { emailOptional, phoneOptional } from '../../helpers/formRegisterConfig'

function AddBirthday() {
  const axios = useAxiosPrivate()
  const { setContent } = useNotification()
  const { formState, register, handleSubmit } = useForm<IAddBirtdayFormdata>()
  const { errors } = formState

  const submitBirthday = async (formData: IAddBirtdayFormdata) => {
    // Change the data type of day and month to numbers
    const processedFormData = {
      ...formData,
      day: Number(formData.day),
      month: Number(formData.month)
    }

    try {
      setContent.show('info', 'Adding birthday')
      await axios.post('users/me/birthdays', processedFormData)
      setContent.show('success', `${formData.name}'s birthday is added successfully`)

      // TODO clear inputs
      // Ask user to see all their saved birthdays
    } catch (e) {
      setContent.show('error', e.response.data.message)
    }
  }

  const makeNumericOptions = (limit: number) =>
    [...Array(limit)].map((_, i) => {
      const value = i + 1
      return (
        <option key={nanoid()} value={value}>
          {value}
        </option>
      )
    })

  const isValid = Boolean(errors.email || errors.phone)

  return (
    <Box>
      <form onSubmit={handleSubmit(submitBirthday)}>
        <FormControl isInvalid={isValid}>
          <FormLabel htmlFor="name">Enter name:</FormLabel>
          <Input
            id="name"
            {...register('name', {
              required: 'Enter the name of our celebrant 🎉'
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone">Phone Number:</FormLabel>
          <Input id="phone" {...register('phone', phoneOptional)} />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email Address:</FormLabel>
          <Input id="email" {...register('email', emailOptional)} />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <Select
            placeholder="Day"
            {...register('day', {
              required: 'Enter the day of birth'
            })}
          >
            {makeNumericOptions(31)}
          </Select>
          <FormErrorMessage>{errors.day?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <Select
            placeholder="Month"
            {...register('month', {
              required: 'Enter the month of birth'
            })}
          >
            {makeNumericOptions(12)}
          </Select>
          <FormErrorMessage>{errors.month?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Add Birthday</Button>
      </form>
    </Box>
  )
}

export default AddBirthday
