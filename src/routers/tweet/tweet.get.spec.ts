import { Response } from 'supertest'
import { Express } from 'express'
import { tweetMockData } from '../../utils/testMockData'
import { mockGetResponse, loadApp } from '../../utils/testHelper'
import Tweet from '../../models/entities/tweet'
import Precedent from '../../models/entities/precedent'

describe('GET /tweet', () => {
  let app:Express
  let res:Response
  beforeAll(async () => {
    app = await loadApp()
    tweetMockData.forEach(async (mockData) => {
      await Tweet.create(mockData).save()
    })
  })
  afterAll(async (done) => {
    await Tweet.delete({})
    await Precedent.delete({})
    done()
  })
  describe('/tweet', () => {
    describe('요청 성공시', () => {
      it('상태코드 200을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet')
        expect(res.status).toBe(200)
        done()
      })
      it('Tweet 객체로 이루어진 배열을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet')
        expect(Array.isArray(res.body.tweets)).toBe(true)
        done()
      })
      it('Tweets 배열의 개수를 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet')
        expect(res.body.counts).toBeGreaterThanOrEqual(0)
        done()
      })
      it('쿼리로 id를 같이 요청한다면 id에 해당하는 트윗 객체 하나를 반환한다', async (done) => {
        res = await mockGetResponse(app, '/tweet?id=3')
        console.log(res.body)
        expect(res.body.tweet.id).toBe(3)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('id에 해당하는 tweet이 없을 경우 404를 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet?id=3480399')
        expect(res.status).toBe(404)
        done()
      })
      it('id가 숫자가 아닌 경우 400을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet?id=sdf')
        expect(res.status).toBe(400)
        done()
      })
    })
  })

  describe('/tweet/current', () => {
    describe('요청 성공시', () => {
      it('상태코드 200을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/current')
        expect(res.status).toBe(200)
        done()
      })
      it('하나의 트윗 객체만을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/current')
        expect(res.body.counts).toBe(1)
        done()
      })
      it('리턴한 Tweet객체의 uploadedAt 속성은 null이다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/current')
        expect(res.body.tweet.uploadedAt).toBe(null)
        done()
      })
    })
  })

  describe('/tweet/previous', () => {
    describe('요청 성공시', () => {
      it('상태코드 200을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/previous')
        expect(res.status).toBe(200)
        done()
      })
      it('배열에는 uploadedAt 속성이 null이 아닌 tweet 객체들만 존재한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/previous')
        res.body.tweets.forEach((tweet:Tweet) => {
          expect(tweet.uploadedAt).not.toBe(null)
        })
        done()
      })
      it('last 쿼리에 숫자를 넣어 요청하면 숫자만큼의 tweet 객체를 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/previous?last=2')
        expect(res.body.counts).toBe(2)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('last 쿼리가 정수가 아닐 경우 400을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/previous?last=dd')
        expect(res.status).toBe(400)
        done()
      })
    })
  })
})
