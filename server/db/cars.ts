import connection from './connection'

export function getAllCars(db = connection) {
  return db('cars').select('*')
}

export async function getCarsById(id: number, db = connection) {
  return db('cars').where({ id }).first()
}

export async function addCar(car: string, db = connection) {
  return db('cars').insert(car).returning('*')
}
