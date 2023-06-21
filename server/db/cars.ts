import connection from './connection'
import { CarModel, CarModelData } from '../../client/models/cars'

export async function getAllCars(db = connection) {
  const allCars = await db('cars').select('*')
  return allCars
}

export async function getCarsById(id: number, db = connection) {
  const carById = await db('cars').where('id', id).select().first()
  return carById
}

export async function addCar(
  newCar: CarModelData,
  db = connection
): Promise<CarModel> {
  const [newCarData] = await db('cars').insert(newCar).returning('*')
  return newCarData
}

export async function deleteCar(id: number, db = connection) {
  console.log('db delete function called')
  const deleteCarById = await db('cars').where('id', id).delete()
  return deleteCarById
}
