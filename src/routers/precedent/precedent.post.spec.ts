import { Response } from 'supertest'
import { Express } from 'express'
import { mockPostResponse, loadApp } from '../../utils/testHelper'

const newProperPrecedent = {
  name: '판례제목',
  content: '판례내용',
  url: '유알엘',
  type: '타입',
}
const properTweetUpdateBody = {
  isTweetUpdate: true,
  precedents: [newProperPrecedent],
}
const properNotTweetUpdateBody = {
  isTweetUpdate: false,
  precedents: [newProperPrecedent],
}

const bodyWithoutPrecedents = {
  isTweetUpdate: false,
}

describe('POST /precedent', () => {
  let app:Express
  let res:Response

  beforeAll(async () => {
    app = await loadApp()
  })
  describe('/precedent', () => {
    describe('요청 성공시', () => {
      it('상태코드 201을 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', properTweetUpdateBody)
        expect(res.status).toBe(201)
        done()
      })
      it('생성된 Precedent 객체들의 개수를 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', properTweetUpdateBody)
        expect(res.body.counts).toBeGreaterThanOrEqual(0)
        done()
      })
      it('생성된 Precedent 객체들을 배열로 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', properTweetUpdateBody)
        expect(Array.isArray(res.body.result)).toBe(true)
        done()
      })
      it('isTweetUpdate가 true일 경우 생성된 Tweet개수는 0 이상이다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', properTweetUpdateBody)
        expect(res.body.newTweetsCount).toBeGreaterThanOrEqual(0)
        done()
      })
      it('isTweetUpdate가 false일 경우 생성된 Tweet개수는 0 이다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', properNotTweetUpdateBody)
        expect(res.body.newTweetsCount).toBe(0)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('precedents가 없을 경우 400을 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', bodyWithoutPrecedents)
        expect(res.status).toBe(400)
        done()
      })
    })
  })
})
