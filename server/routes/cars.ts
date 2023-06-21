import { Router } from 'express'

import * as db from '../db/cars'
import { addCar, deleteCar } from '../db/cars'

const router = Router()

// /api/v1/cars
router.get('/', async (req, res) => {
  try {
    const cars = await db.getAllCars()
    res.json(cars)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong fetching car' })
  }
})

// add
router.post('/', async (req, res) => {
  try {
    const newCarData = req.body
    const newCar = await addCar(newCarData)
    res.json(newCar)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong adding car' })
  }
})

// delete /api/v1/cars/:id
router.delete('/:id', async (req, res) => {
  console.log('delete route get called')
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteCar(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete your car',
    })
  }
})

export default router
