import Tweet from '../models/entities/tweet'

class TweetModel {
  getAll():Promise<Tweet[]> {
    return Tweet.find()
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
}

export default TweetModel
