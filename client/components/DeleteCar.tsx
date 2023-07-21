import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePlate } from '../apis/plates'

interface Props {
  id: number
  plate: string
  location: string
}

export default function DeletePlate({ id, plate, location, imgUrl }: Props) {
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
    <div className="p-12">
      <div className="flex flex-col gap-8">
        <p>{id}.</p>
        <p>Plate: {plate}</p>
        <p>Location: {location}</p>

        <span>
          <button
            onClick={handleDelete}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  )
}
