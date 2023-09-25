import * as dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET: string | undefined = process.env.JWT_SECRET

if (JWT_SECRET === undefined || JWT_SECRET === null || JWT_SECRET === '') {
  throw new Error('JWT_SECRET environment variable is not defined.')
}

export default {
  jwtSecret: JWT_SECRET
}
