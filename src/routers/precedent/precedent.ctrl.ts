import { Request, Response, NextFunction } from 'express'
import { OK, CREATED } from 'http-status-codes'
import { BadRequest } from '../../errors/index'
import PrecedentModels from '../../models/precedentModels'
import pagingHelper from '../../utils/pagingHelper'

const precedentModels:PrecedentModels = new PrecedentModels()

const getPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { type, page } = req.query
  const allowTypes:string[] = ['civil', 'criminal']
  let precedents:PrecedentInstance[] | undefined
  try {
    if (type) {
      if (allowTypes.includes(type as string)) {
        precedents = await precedentModels.getPrecedentsByType(type as string)
      } else {
        throw new BadRequest('type query는 civil(민사)나 criminal(형사)두 가지만 가능합니다.')
      }
    } else {
      precedents = await precedentModels.getAll()
    }

    if (page) {
      const intPage = parseInt(page as string, 10)
      if (Number.isNaN(intPage)) { throw new BadRequest('page query는 숫자만 가능합니다.') }
      precedents = pagingHelper(precedents as PrecedentInstance[], intPage)
    }
    const counts = precedents?.length ?? 0
    return res.status(OK).json({ counts, precedents })
  } catch (e) {
    next(e)
  }
}

const postPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { precedents } = req.body
  try {
    if (!precedents || precedents.length < 1) { throw new BadRequest('precedent는 1개 이상이 필요합니다.') }
    const precedentsUpdatingList = precedents.map((
      precedent:Precedent,
    ) => precedentModels.createPrecedent(precedent))

    const result = await Promise.all(precedentsUpdatingList)
    const counts = result.length
    // TODO 판례요지 문자별 파싱 로직
    // const newTweetCounts = 0
    // if (isTweetUpdate !== false) {}

    return res.status(CREATED).json({ counts, result })
  } catch (e) {
    next(e)
  }
}

export default {
  getPrecedents,
  postPrecedents,
}
