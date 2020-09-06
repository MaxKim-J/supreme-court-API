import { Request, Response, NextFunction } from 'express'
import { OK, CREATED } from 'http-status-codes'
import Precedent from '@/models/entities/precedent'
import Tweet from '@/models/entities/tweet'
import TweetModels from '../../models/tweetModels'
import PrecedentModels from '../../models/precedentModels'
import { BadRequest, NotFound } from '../../errors/index'
import sliceByPage from '../../utils/pagingHelper'
import parsingPrecedent from '../../utils/parsingHelper'
import validateIdNaN from '../../utils/idValidatingHelper'

const precedentModels:PrecedentModels = new PrecedentModels()
const tweetModels:TweetModels = new TweetModels()

const getPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { type, page, id } = req.query
  const allowTypes:string[] = ['civil', 'criminal', 'administration', 'domestic']
  let precedents:Precedent[] | undefined
  try {
    if (id) {
      if (type || page) { throw new BadRequest('id 쿼리는 유일한 쿼리로만 사용할 수 있습니다.') }
      const precedentId = validateIdNaN(id as string)
      const precedent = await precedentModels.getPrecedentById(precedentId)
      if (!precedent) { throw new NotFound('id에 해당하는 판례가 존재하지 않습니다.') }
      return res.status(OK).json({ counts: 1, precedent })
    }
    if (type) {
      if (id) { throw new BadRequest('id 쿼리는 유일한 쿼리로만 사용할 수 있습니다.') }
      if (allowTypes.includes(type as string)) {
        precedents = await precedentModels.getPrecedentsByType(type as string)
      } else {
        throw new BadRequest('type query는 civil(민사), criminal(형사), administration(행정), domestic(가정) 네 가지만 가능합니다.')
      }
    } else {
      precedents = await precedentModels.getAll()
    }

    if (page) {
      if (id) { throw new BadRequest('id 쿼리는 유일한 쿼리로만 사용할 수 있습니다.') }
      const pageNum = validateIdNaN(page as string)
      precedents = sliceByPage(precedents as Precedent[], pageNum)
    }
    const counts = precedents?.length ?? 0
    return res.status(OK).json({ counts, precedents })
  } catch (e) {
    return next(e)
  }
}
const resolveUpdatePromises = async <T>(updatingList:Promise<Mutation<T>>[]) => {
  const updatedResult = await Promise.all(updatingList)
  const newElementLength = updatedResult.filter((
    updatedElement,
  ) => updatedElement?.success).length

  return { updatedResult, newElementLength }
}

const postPrecedents = async (req:Request, res:Response, next:NextFunction) => {
  const { precedents, isTweetUpdate } = req.body
  try {
    if (!precedents || precedents.length < 1) { throw new BadRequest('precedent는 1개 이상이 필요합니다.') }
    const precedentsUpdatingList:Promise<Mutation<Precedent>>[] = precedents.map((
      precedent:Precedent,
    ) => precedentModels.createPrecedent(precedent))

    const {
      updatedResult: precedentsUpdatedResult,
      newElementLength: newPrecedentsLength,
    } = await resolveUpdatePromises<Precedent>(precedentsUpdatingList)

    if (isTweetUpdate ?? false) {
      const tweetsUpdatingList:Promise<Mutation<Tweet>>[] = []
      precedentsUpdatedResult.forEach((
        precedent:Mutation<Precedent>,
      ) => {
        const { content } = precedent.result as Precedent
        parsingPrecedent(content).forEach((cont) => {
          tweetsUpdatingList.push(tweetModels.createTweet({
            content: cont,
            uploadedAt: null,
            precedent: precedent.result,
          }))
        })
      })

      const {
        updatedResult: tweetsUpdatedResult,
        newElementLength: newTweetsLength,
      } = await resolveUpdatePromises<Tweet>(tweetsUpdatingList)

      return res.status(CREATED).json({
        counts: {
          newPrecedentsLength,
          newTweetsLength,
        },
        result: {
          precedentsUpdatedResult,
          tweetsUpdatedResult,
        },
      })
    }
    return res.status(CREATED).json({
      counts: {
        newPrecedentsLength,
        newTweetsLength: 0,
      },
      result: {
        precedentsUpdatedResult,
        tweetsUpdatedResult: [],
      },
    })
  } catch (e) {
    return next(e)
  }
}

export default {
  getPrecedents,
  postPrecedents,
}
