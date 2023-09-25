import type { Request, Response } from 'express'
import UserModel, { IUser } from '../models/UserModel'

// Auth
import bcrypt from 'bcrypt'
import { generateToken } from '../services/auth/jwtService'

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Check if the user already exists
    const existingUser: IUser | null = await UserModel.findOne({ email })

    if (existingUser !== null) {
      res.status(409).json({ error: 'User already exists' })

      return
    }

    // Hash user's password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user document
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword
    })

    // Save user to database
    await newUser.save()

    // Generate a JWT token for the new user
    const token = generateToken({ userId: newUser._id, username: newUser.username })

    res.status(201).json({ user: newUser, token })
  } catch (error) {
    console.log('ERROR: Creating user', error)
    res.status(500).json({ error })
  }
}

// List all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find()

    res.status(200).json(users)
  } catch (error) {
    console.log('ERROR: Fetching users', error)

    res.status(500).json({ error: '500, Internal Server Error' })
  }
}
