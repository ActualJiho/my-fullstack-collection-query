import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPlate } from '../apis/plates'
import { ChangeEvent, FormEvent, useState } from 'react'
import { PlateModelData } from '../models/plates'
const initialFormData = {
  plate: '',
  location: '',
}

export default function AddCarForm() {
  const [form, setForm] = useState<PlateModelData>(initialFormData)

  const queryClient = useQueryClient()

  const addPlateMutation = useMutation(addPlate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['car'])
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addPlateMutation.mutate(form)
    setForm(initialFormData)
  }

  if (addPlateMutation.isError) {
    return <div>There was an error trying to add your plate</div>
  }

  if (addPlateMutation.isLoading) {
    return <div>Adding your plate</div>
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Add Car Form">
      <p>
        <label htmlFor="plate">Plate:</label>
        <br />
        <input
          id="plate"
          onChange={handleChange}
          value={form.plate}
          name="plate"
          required
        />
      </p>
      <p>
        <label htmlFor="name">Location:</label>
        <br />
        <input
          id="location"
          onChange={handleChange}
          value={form.location}
          name="location"
          required
        />
      </p>
      <button type="submit">Add a Plate</button>
    </form>
  )
}
