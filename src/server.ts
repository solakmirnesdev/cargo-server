import express, { Express } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import { connectDatabase } from './database/db'

// Entry routes
import WelcomeRoute from './routes/WelcomeRoute'
import DocumentationRoute from './routes/DocumentationRoute'

// Route config
import configureRoutes from './config/routeConfig'

const app: Express = express()

app.use(express.static('public'))

// Middleware
app.use('/', WelcomeRoute)
app.use('/', DocumentationRoute)

app.use(bodyParser.json())
app.use(morgan('dev'))

// Configure routes
configureRoutes(app)

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
