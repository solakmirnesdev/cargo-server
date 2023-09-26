import express from 'express'
import { createUser, getUsers } from '@controllers/UserController'
import { authenticateJWT } from 'services/auth/jwtService'

const router = express.Router()

router.post('/users', createUser)
router.get('/users', authenticateJWT, getUsers)

export default router
