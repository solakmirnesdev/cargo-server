import type { Document } from 'mongoose'

interface UserDocument extends Document {
  username: string
  email: string
  password: string
}

export default UserDocument
