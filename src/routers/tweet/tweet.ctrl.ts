import { Request, Response, NextFunction } from 'express'
import { OK } from 'http-status-codes'
import Tweet from '@/models/entities/tweet'
import TweetModels from '../../models/tweetModels'
import { BadRequest } from '../../errors'

const tweetModels:TweetModels = new TweetModels()

const getAllTweets = async (req:Request, res:Response, next:NextFunction) => {
  const tweets:Tweet[] = await tweetModels.getAll()
  const counts = tweets.length
  return res.status(OK).json({ counts, tweets })
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
      const lastInt = parseInt(last as string, 10)
      if (Number.isNaN(lastInt)) { throw new BadRequest('last query는 숫자만 가능합니다.') }
      uploadedTweets = uploadedTweets.slice(0, lastInt)
    }
    const counts = uploadedTweets.length
    return res.status(OK).json({ counts, tweets: uploadedTweets })
  } catch (e) {
    next(e)
  }
}

export default {
  getAllTweets,
  getCurrentTweet,
  getPreviousTweet,
}
