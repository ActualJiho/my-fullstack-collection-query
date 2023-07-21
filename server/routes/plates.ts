import { Router } from 'express'

import * as db from '../db/plates'

const router = Router()

// /api/v1/plates
router.get('/', async (req, res) => {
  try {
    const plates = await db.getAllPlates()
    res.json(plates)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong fetching plates information' })
  }
})

// add
router.post('/', async (req, res) => {
  console.log('db add route called')
  try {
    const newPlateData = req.body
    const newPlate = await db.addPlate(newPlateData)
    res.json(newPlate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong adding new plate' })
  }
})

// delete /api/v1/plates/:id
router.delete('/:id', async (req, res) => {
  console.log('delete route get called')
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deletePlate(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete your plate',
    })
  }
})

export default router
