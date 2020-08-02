import { Request, Response, NextFunction } from 'express'
import Precedent from '../../models/entities/precedent'
import PrecedentModels from '../../models/precedentModels'
import pagingHelper from '../../utils/pagingHelper'

const precedentModels:PrecedentModels = new PrecedentModels()

const getAllPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { type, page } = req.query
  let result
  if (type) {
    result = await precedentModels.getPrecedentsByType(type as string)
  } else {
    result = await precedentModels.getAll()
  }
  if (page) {
    const intPage = parseInt(page as string, 10)
    result = pagingHelper(result as Precedent[], intPage)
  }
  return res.json(result)
}

export default {
  getAllPrecedents,
}
