import request from 'superagent'
import { PlateModel, PlateModelData } from '../models/plates'

export async function getPlates(): Promise<PlateModel[]> {
  const response = await request.get('/api/v1/plates')
  return response.body
}

export async function addPlate(newPlate: PlateModelData): Promise<PlateModel> {
  const response = await request.post('/api/v1/plates').send(newPlate)
  return response.body
}

interface DeletePlate {
  id: PlateModel['id']
}
export async function deletePlate({ id }: DeletePlate): Promise<void> {
  console.log('api: deleteplate function called')
  await request.delete(`/api/v1/plates/${id}`)
}
