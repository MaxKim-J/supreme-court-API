import request, { Response } from 'supertest'
import express, { Express } from 'express'
import loaders from '../../loaders'

// TODO : 공통 로직을 test config로 분리하기
describe('GET /precedent는', () => {
  let app:Express
  let res:Response
  beforeAll(async () => {
    app = express()
    await loaders(app)
    res = await request(app).get('/precedent')
  })
  describe('성공시', () => {
    it('상태코드 200 반환', async (done) => {
      expect(res.status).toBe(200)
      done()
    })
    it('문자열 반환', async (done) => {
      expect(res.body).toBe('precedent API')
      done()
    })
  })
})
