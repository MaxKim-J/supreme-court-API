import { Response } from 'supertest'
import { Express } from 'express'
import { mockPostResponse, loadApp } from '../../utils/testHelper'

const newProperPrecedent = {
  name: '판례이름',
  content: '판례내용',
  url: '유알엘',
  type: '타입',
}
const newWrongPrecedent = {
  name: '판례이름',
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
const uncompletedBody = {
  precedents: [newProperPrecedent],
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
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.status).toBe(201)
        done()
      })
      it('생성된 Precedent 객체를 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.body).toBe(true)
        done()
      })
      it('tweet 데이터베이스를 업데이트하고 tweet:true를 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.body).toBe(true)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('isTweetUpdate가 빠지면 400을 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newWrongPrecedent])
        expect(res.status).toBe(400)
        done()
      })
    })
  })
  describe('/precedent?tweet=false', () => {
    describe('요청 성공시', () => {
      it('상태코드 201을 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.status).toBe(201)
        done()
      })
      it('생성된 Precedent 객체를 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.body).toBe(true)
        done()
      })
      it('tweet 데이터베이스를 업데이트하지 않는다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.body).toBe(true)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('tweet이 true, false가 아닐 경우 400을 반환한다.', async (done) => {
        res = await mockPostResponse(app, '/precedent', [newProperPrecedent])
        expect(res.status).toBe(400)
        done()
      })
    })
  })
})
