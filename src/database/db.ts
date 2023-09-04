import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export async function connectDatabase (): Promise<void> {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DATABASE}`)
    console.log(`SUCCESS: Connected to MongoDB - Local database name: ${process.env.MONGO_DATABASE}`)
  } catch (error) {
    console.error('ERROR: Connecting to MongoDB:', error)
    throw error
  }
}
