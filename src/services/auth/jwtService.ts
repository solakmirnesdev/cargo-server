import jwt from 'jsonwebtoken'
import config from '../../config/authConfig'

export function generateToken (payload: any): string {
  try {
    // Sign the payload with the secret key and set an expiration time (e.g., 1 hour)
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' })
    return token
  } catch (error) {
    console.error('Error generating token:', error)
    throw error
  }
}
