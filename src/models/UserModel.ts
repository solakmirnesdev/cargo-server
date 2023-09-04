import mongoose, { Schema } from 'mongoose'
// Interfaces
import type UserDocument from '@interfaces/user-document'

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
