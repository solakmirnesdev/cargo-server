import express from 'express'
import * as dotenv from 'dotenv'
import { connectDatabase } from './database/db'

const app = express()

// Env config
dotenv.config()

// Connect to mongoDB
connectDatabase()

const port = 8000

const server = app.listen(port, () => {
  console.log(`SUCCESS: Server started on ${port}`)
})

process.on('SIGINT', () => {
  console.log('INFO: Shutting down server...')
  server.close(() => {
    console.log('SUCCESS: Server shut down.')
    process.exit(0)
  })
})
