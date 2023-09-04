import express, { Request, Response } from 'express'
import path from 'path'

const router = express.Router()

// Define route for Welcoming page
router.get('/', (req: Request, res: Response) => {
  const welcomeHtmlPath = path.join(__dirname, '../views/welcome.html')

  res.sendFile(welcomeHtmlPath)
})

export default router
