import { ChangeEvent, FormEvent, useState } from 'react'
import { CarModelData } from '../models/cars'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCar, deleteCar } from '../apis/cars'
import { useParams } from 'react-router-dom'

const initialFormData = {
  brand: '',
  name: '',
}
interface Props {
  id: number
  name: string
}

export default function CarForm({ id, name }: Props) {
  const [form, setForm] = useState<CarModelData>(initialFormData)
  const [editing, setEditing] = useState(false)

  const queryClient = useQueryClient()

  const addCarMutation = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['car'])
    },
  })

  const deleteCarMutation = useMutation(deleteCar, {
    onSuccess: () => {
      console.log('delete car mutation called')
      queryClient.invalidateQueries(['car'])
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addCarMutation.mutate(form)
    setForm(initialFormData)
  }

  const handleDelete = () => {
    console.log(`handleDelete clicked: ${id}`)
    deleteCarMutation.mutate({ id })
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setText(name)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }
  if (addCarMutation.isError) {
    return <div>There was an error trying to add your car</div>
  }

  if (addCarMutation.isLoading) {
    return <div>Adding your car</div>
  }

  return (
    <>
      {editing ? (
        <form onSubmit={handleSubmit} aria-label="Add Car Form">
          <p>
            <label htmlFor="brand">Brand:</label>
            <br />
            <input
              id="brand"
              onChange={handleChange}
              value={form.brand}
              name="brand"
              required
            />
          </p>

          <p>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              id="name"
              onChange={handleChange}
              value={form.name}
              name="name"
              required
            />
          </p>

          <button type="submit">Add a Car</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} -{' '}
          <span>
            <button onClick={handleStartEditingClick}>Rename</button>
            <button onClick={handleDelete}>Delete</button>
          </span>
        </p>
      )}
    </>
  )
}
