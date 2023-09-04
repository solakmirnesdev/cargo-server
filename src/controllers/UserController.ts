import type { Request, Response } from 'express'
import UserModel from '@models/UserModel'

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
      res.status(409).json({ error: 'User already exists' })

      return
    }

    // Create new user document
    const newUser = new UserModel({
      username,
      email,
      password
    })

    // Save user to database
    await newUser.save()

    res.status(201).json(newUser)
  } catch (error) {
    console.log('ERROR: Creating user', error)
    res.status(500).json({ error: '500, Internal Server Error' })
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
