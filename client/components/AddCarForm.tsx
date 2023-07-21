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
    <div className="flex justify-center">
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
            className="w-full"
          />
        </p>
        <p>
          <label htmlFor="location">Location:</label>
          <br />
          <input
            id="location"
            onChange={handleChange}
            value={form.location}
            name="location"
            required
            className="w-full"
          />
        </p>
        <p>
          <label htmlFor="imgUrl">File:</label>
          <br />
          <input
            id="imgUrl"
            onChange={handleChange}
            value=""
            name="imgUrl"
            type="file"
          />
        </p>
        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add a Plate
        </button>
      </form>
    </div>
  )
}
