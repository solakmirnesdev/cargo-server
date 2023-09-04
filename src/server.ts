import express from 'express'
import * as dotenv from 'dotenv'
import { connectDatabase } from './database/db'
import WelcomeRoute from './routes/WelcomeRoute'

const app = express()

app.use(express.static('public'))
app.use('/', WelcomeRoute)

// Env config
dotenv.config()

// Connect to mongoDB
connectDatabase()

const port: number = parseInt(process.env.PORT || '8000', 10)

const server = app.listen(port, () => {
  console.log(`SUCCESS: Server started on port: ${port}`)
})

process.on('SIGINT', () => {
  console.log('INFO: Shutting down server...')
  server.close(() => {
    console.log('SUCCESS: Server shut down.')
    process.exit(0)
  })
})
