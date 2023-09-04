import express, { Application } from 'express'
import { createUser, getUsers } from '../controllers/UserController'

const configureRoutes = (app: Application): void => {
  // Define user routes
  app.post('/users', createUser)
  app.get('/users', getUsers)

  // Add more routes here as needed
}

export default configureRoutes
