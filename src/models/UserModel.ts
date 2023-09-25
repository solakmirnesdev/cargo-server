import mongoose, { Document, Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: false
  }
})

export interface IUser extends Document {
  username: string
  email: string
  password: string
}

const UserModel = mongoose.model<IUser>('User', userSchema)

export default UserModel
