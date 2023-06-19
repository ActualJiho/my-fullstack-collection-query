import express from 'express'
import path from 'path'
import carsRoutes from './routes/cars'
const server = express()

server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

server.use('/api/v1/cars', carsRoutes)
export default server
