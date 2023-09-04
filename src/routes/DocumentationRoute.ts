import express, { Request, Response } from 'express'
import path from 'path'

const router = express.Router()

// Defining route for documentation page
router.get('/documentation', (req: Request, res: Response) => {
  const documentationHtmlPath = path.join(__dirname, '../views/documentation.html')

  res.sendFile(documentationHtmlPath)
})

export default router
