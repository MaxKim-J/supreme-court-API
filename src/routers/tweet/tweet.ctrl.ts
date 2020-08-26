import { Request, Response, NextFunction } from 'express'
import { OK, CREATED } from 'http-status-codes'
import Tweet from '@/models/entities/tweet'
import TweetModels from '../../models/tweetModels'
import { BadRequest, NotFound, Conflict } from '../../errors'

const tweetModels:TweetModels = new TweetModels()

const getTweet = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.query
  try {
    if (id) {
      const idInt = parseInt(id as string, 10)
      if (Number.isNaN(idInt)) { throw new BadRequest('id query는 숫자만 가능합니다.') }
      const tweet = await tweetModels.getTweetById(idInt)
      if (!tweet) { throw new NotFound('id에 해당하는 트윗이 존재하지 않습니다.') }
      return res.status(OK).json({ counts: 1, tweet })
    }
    const tweets:Tweet[] = await tweetModels.getAll()
    const counts = tweets.length
    return res.status(OK).json({ counts, tweets })
  } catch (e) {
    next(e)
  }
}

const getCurrentTweet = async (req:Request, res:Response, next:NextFunction) => {
  const unuploadedTweets:Tweet[] = await tweetModels.getUnuploadedTweetsAndPrecedent()
  const randomInt = Math.floor(Math.random() * unuploadedTweets.length)
  const tweet = unuploadedTweets[randomInt]
  return res.status(OK).json({ counts: 1, tweet })
}

const getPreviousTweet = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { last } = req.query
    let uploadedTweets:Tweet[] = await tweetModels.getUploadedTweets()
    if (last) {
      // todo 이 로직 유틸로 따로 빼도 될듯
      const lastInt = parseInt(last as string, 10)
      if (Number.isNaN(lastInt)) { throw new BadRequest('last query는 숫자만 가능합니다.') }
      uploadedTweets = uploadedTweets.slice(0, lastInt)
    }
    const counts = uploadedTweets.length
    return res.status(OK).json({ counts, tweets: uploadedTweets })
  } catch (e) {
    return next(e)
  }
}

const putTimeStampOnTweet = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params
  try {
    const idInt = parseInt(id as string, 10)
    if (Number.isNaN(idInt)) { throw new BadRequest('id query는 숫자만 가능합니다.') }
    const tweet = await tweetModels.getTweetById(idInt)
    if (!tweet) { throw new NotFound('id에 해당하는 트윗이 존재하지 않습니다.') }
    if (tweet.uploadedAt !== null) { throw new Conflict('이미 업로드된 트윗입니다.') }
    const { raw, affected } = await tweetModels.putTimestampOnTweet(idInt, new Date())
    return res.status(CREATED).json({ counts: affected, tweet: raw[0] })
  } catch (e) {
    return next(e)
  }
}

export default {
  getTweet,
  getCurrentTweet,
  getPreviousTweet,
  putTimeStampOnTweet,
}
