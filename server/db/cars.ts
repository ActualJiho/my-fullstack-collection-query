import connection from './connection'
import { CarModelData } from '../../client/models/cars'

export function getAllCars(db = connection) {
  return db('cars').select('*')
}

export async function getCarsById(id: number, db = connection) {
  return db('cars').where({ id }).first()
}

export async function addCar(newCar: CarModelData, db = connection) {
  const [car] = await db('cars').insert(newCar).returning('*')
  return car
}
