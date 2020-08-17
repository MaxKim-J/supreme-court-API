import { DeepPartial } from 'typeorm'
import Tweet from '../models/entities/tweet'

class TweetModel {
  getAll():Promise<Tweet[]> {
    return Tweet.find()
  }

  getTweetById(id:number):Promise<Tweet | undefined> {
    return Tweet.findOne({ where: { id } })
  }

  getUploadedTweets():Promise<Tweet[]> {
    return Tweet.createQueryBuilder('tweet')
      .where('tweet.uploadedAt IS NOT NULL')
      .orderBy('tweet.uploadedAt', 'DESC')
      .getMany()
  }

  getUnuploadedTweetsAndPrecedent():Promise<Tweet[]> {
    return Tweet.createQueryBuilder('tweet')
      .leftJoinAndSelect('tweet.precedent', 'precedent')
      .select(['tweet', 'precedent.name', 'precedent.url', 'precedent.id'])
      .where('tweet.uploadedAt IS NULL')
      .getMany()
  }

  async createTweet(tweet:DeepPartial<Tweet>):Promise<Mutation<Tweet>> {
    try {
      const result = await Tweet.create(tweet).save()
      return {
        success: true,
        result,
      }
    } catch (e) {
      return {
        success: false,
        error: e,
      }
    }
  }
}

export default TweetModel
