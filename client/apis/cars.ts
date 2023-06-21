import request from 'superagent'
import { CarModel, CarModelData } from '../models/cars'

export async function getCars(): Promise<CarModel[]> {
  const response = await request.get('/api/v1/cars')
  return response.body
}

export async function addCar(newCar: CarModelData): Promise<CarModel> {
  const response = await request.post('/api/v1/cars').send(newCar)
  return response.body
}

interface DeleteCar {
  id: CarModel['id']
}
export async function deleteCar({ id }: DeleteCar): Promise<void> {
  console.log('api: deletecar function called')
  await request.delete(`/api/v1/cars/${id}`)
}
