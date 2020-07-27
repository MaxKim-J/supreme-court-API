import { Request, Response } from 'express'

const index = (req:Request, res:Response) => {
  res.status(200).json('tweet API')
}

export default {
  index,
}
