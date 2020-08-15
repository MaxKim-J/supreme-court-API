import { Response } from 'supertest'
import { Express } from 'express'
import { mockGetResponse, loadApp } from '../../utils/testHelper'

describe('GET /tweet', () => {
  let app:Express
  let res:Response
  beforeAll(async () => {
    app = await loadApp()
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
      it('리턴한 Tweet객체의 isUploaded 속성은 null이다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/current')
        expect(res.body.tweet.isUploaded).toBe(null)
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
      it('배열에는 isUploaded 속성이 null이 아닌 tweet 객체들만 존재한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/previous')
        res.body.tweets.forEach((tweet:Tweet) => {
          expect(tweet.uploadedAt).not.toBe(null)
        })
        expect(Array.isArray(res.body.precedents)).toBe(true)
        done()
      })
      it('last 쿼리에 숫자를 넣어 요청하면 숫자만큼의 tweet 객체를 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/tweet/previous?last=5')
        expect(res.body.counts).toBe(5)
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
