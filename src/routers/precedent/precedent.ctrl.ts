import { Request, Response, NextFunction } from 'express'
import Precedent from '../../models/entities/precedent'
import PrecedentModels from '../../models/precedentModels'
import pagingHelper from '../../utils/pagingHelper'

const precedentModels:PrecedentModels = new PrecedentModels()

const getPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { type, page } = req.query
  const allowTypes:string[] = ['civil', 'criminal']

  let result

  if (type) {
    if (allowTypes.includes(type as string)) {
      result = await precedentModels.getPrecedentsByType(type as string)
    } else {
      return res.status(400).end()
    }
  } else {
    result = await precedentModels.getAll()
  }

  if (page) {
    const intPage = parseInt(page as string, 10)
    if (Number.isNaN(intPage)) { return res.status(400).end() }
    result = pagingHelper(result as Precedent[], intPage)
  }
  return res.status(200).json(result)
}

export default {
  getPrecedents,
}
