import mongoose from 'mongoose'

export async function connectDatabase (): Promise<void> {
  try {
    await mongoose.connect('mongodb://localhost:27017/cargodb')
    console.log('SUCCESS: Connected to MongoDB')
  } catch (error) {
    console.error('ERROR: Connecting to MongoDB:', error)
    throw error
  }
}
