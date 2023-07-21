import connection from './connection'
import { PlateModel, PlateModelData } from '../../client/models/plates'

export async function getAllPlates(db = connection) {
  const allPlates = await db('plates').select('*')
  return allPlates
}

export async function getPlatesById(id: number, db = connection) {
  const plateById = await db('plates').where('id', id).select().first()
  return plateById
}

export async function addPlate(
  newPlate: PlateModelData,
  db = connection
): Promise<PlateModel> {
  console.log('db add function called')
  const [newPlateData] = await db('plates').insert(newPlate).returning('*')
  return newPlateData
}

export async function deletePlate(id: number, db = connection) {
  console.log('db delete function called')
  const deletePlateById = await db('plates').where('id', id).delete()
  return deletePlateById
}
