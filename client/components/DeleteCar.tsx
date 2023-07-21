import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPlate, deletePlate } from '../apis/plates'

interface Props {
  id: number
  plate: string
  location: string
}

export default function DeletePlate({ id, plate, location }: Props) {
  const queryClient = useQueryClient()

  const deletePlateMutation = useMutation(deletePlate, {
    onSuccess: () => {
      console.log('delete plate mutation called')
      queryClient.invalidateQueries(['plate'])
    },
  })

  const handleDelete = () => {
    console.log(`handleDelete clicked: ${id}`)
    deletePlateMutation.mutate({ id })
  }

  if (deletePlateMutation.isError) {
    return <div>There was an error trying to delete your plate</div>
  }

  if (deletePlateMutation.isLoading) {
    return <div>delete your plate</div>
  }

  return (
    <>
      <p>{id}.</p>
      <div>
        <p>Plate: {plate}</p>
        <p>Location: {location}</p>

        <span>
          <button onClick={handleDelete}>Delete</button>
        </span>
      </div>
    </>
  )
}
