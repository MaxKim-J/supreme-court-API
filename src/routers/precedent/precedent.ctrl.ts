import { Request, Response, NextFunction } from 'express'
import PrecedentModels from '../../models/precedentModels'
import pagingHelper from '../../utils/pagingHelper'

const precedentModels:PrecedentModels = new PrecedentModels()

const getPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { type, page } = req.query
  const allowTypes:string[] = ['civil', 'criminal']

  let precedents:PrecedentInstance[] | undefined

  if (type) {
    if (allowTypes.includes(type as string)) {
      precedents = await precedentModels.getPrecedentsByType(type as string)
    } else {
      return res.status(400).end()
    }
  } else {
    precedents = await precedentModels.getAll()
  }

  if (page) {
    const intPage = parseInt(page as string, 10)
    if (Number.isNaN(intPage)) { return res.status(400).end() }
    precedents = pagingHelper(precedents as PrecedentInstance[], intPage)
  }
  const counts = precedents?.length ?? 0
  return res.status(200).json({ counts, precedents })
}

export default {
  getPrecedents,
}
