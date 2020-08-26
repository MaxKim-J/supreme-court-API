import { Response } from 'supertest'
import { Express } from 'express'
import { mockPutResponse, loadApp } from '../../utils/testHelper'
import TweetModels from '../../models/tweetModels'
import Tweet from '../../models/entities/tweet'
import Precedent from '../../models/entities/precedent'

const properTweetBody = {
  name: '판례제목',
  content: '안뇽',
}

const properTweetUpdateBody = {
  tweetUploadTime: new Date(),
}

const unProperTweetUpdateBody = {
  tweetUploadTime: 'not Date',
}

describe('PUT /tweet', () => {
  let app:Express
  let res:Response
  let tweetId:number

  beforeAll(async () => {
    app = await loadApp()
    const tweetModels:TweetModels = new TweetModels()
    const { result } = await tweetModels.createTweet(properTweetBody)
    tweetId = result?.id as number
  })
  afterAll(async (done) => {
    await Tweet.delete({})
    await Precedent.delete({})
    done()
  })
  describe('/tweet/:id', () => {
    describe('요청 성공시', () => {
      it('상태코드 201을 반환한다.', async (done) => {
        res = await mockPutResponse(app, `/tweet/${tweetId}`, properTweetUpdateBody)
        expect(res.status).toBe(201)
        done()
      })
      it('param으로 요청한 id에 맞는 Tweet 객체를 반환한다.', async (done) => {
        res = await mockPutResponse(app, `/tweet/${tweetId}`, properTweetUpdateBody)
        expect(res.body.tweet.id).toBe(tweetId)
        done()
      })
      it('반환하는 Tweet객체는 uploadedAt이 null이 아니다', async (done) => {
        res = await mockPutResponse(app, `/tweet/${tweetId}`, properTweetUpdateBody)
        expect(res.body.tweet.updatedAt).not.toBe(null)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('id에 해당하는 tweet이 없을 경우 404를 반환한다.', async (done) => {
        res = await mockPutResponse(app, '/tweet/3423523', unProperTweetUpdateBody)
        expect(res.status).toBe(404)
        done()
      })
      it('id에 해당하는 tweet의 uploadedAt이 이미 null이 아닌 경우 409를 반환한다.', async (done) => {
        res = await mockPutResponse(app, `/tweet/${tweetId}`, properTweetUpdateBody)
        expect(res.status).toBe(409)
        done()
      })
      it('param id가 숫자가 아닌 경우 400을 반환한다.', async (done) => {
        res = await mockPutResponse(app, '/tweet/sfz', properTweetUpdateBody)
        expect(res.status).toBe(400)
        done()
      })
    })
  })
})
