import { Router } from 'express'

import * as db from '../db/cars'
import { addCar } from '../db/cars'

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

export default router
