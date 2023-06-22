import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCar } from '../apis/cars'
import { ChangeEvent, FormEvent, useState } from 'react'
import { CarModelData } from '../models/cars'
const initialFormData = {
  brand: '',
  name: '',
}

export default function AddCarForm() {
  const [form, setForm] = useState<CarModelData>(initialFormData)

  const queryClient = useQueryClient()

  const addCarMutation = useMutation(addCar, {
    onSuccess: () => {
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

  if (addCarMutation.isError) {
    return <div>There was an error trying to add your car</div>
  }

  if (addCarMutation.isLoading) {
    return <div>Adding your car</div>
  }

  return (
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
    </form>
  )
}
