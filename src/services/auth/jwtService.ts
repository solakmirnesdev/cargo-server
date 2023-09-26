// jwt
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

// config
import config from '../../config/authConfig'

// express
import type { Request, Response, NextFunction } from 'express'

// interface
interface AuthenticatedReq extends Request {
  user?: JwtPayload
}

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

export function authenticateJWT (req: AuthenticatedReq, res: Response, next: NextFunction): any {
  const token = req.header('Authorization')?.split(' ')[1]

  if (token === undefined || token === null || token === '') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload
    req.user = decoded

    next()
  } catch (error) {
    return res.status(403).json({ message: '403 Error ', error })
  }
}
