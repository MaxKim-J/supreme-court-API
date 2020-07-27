import { Request, Response } from 'express'

const index = (req:Request, res:Response) => {
  res.status(200).json('precedent API')
}

export default {
  index,
}
