import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCar, deleteCar } from '../apis/cars'

interface Props {
  id: number
  name: string
}

export default function DeleteCar({ id, name }: Props) {
  const queryClient = useQueryClient()

  const deleteCarMutation = useMutation(deleteCar, {
    onSuccess: () => {
      console.log('delete car mutation called')
      queryClient.invalidateQueries(['car'])
    },
  })

  const handleDelete = () => {
    console.log(`handleDelete clicked: ${id}`)
    deleteCarMutation.mutate({ id })
  }

  if (deleteCarMutation.isError) {
    return <div>There was an error trying to delete your car</div>
  }

  if (deleteCarMutation.isLoading) {
    return <div>delete your car</div>
  }

  return (
    <>
      <p>{id}.</p>
      <div>
        Car: {name}
        <span>
          <button onClick={handleDelete}>Delete</button>
        </span>
      </div>
    </>
  )
}
