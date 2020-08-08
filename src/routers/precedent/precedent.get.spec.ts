import { Response } from 'supertest'
import { Express } from 'express'
import { mockGetResponse, loadApp } from '../../utils/testHelper'

describe('GET /precedent', () => {
  let app:Express
  let res:Response
  beforeAll(async () => {
    app = await loadApp()
  })
  describe('/precedent', () => {
    describe('요청 성공시', () => {
      it('상태코드 200을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent')
        expect(res.status).toBe(200)
        done()
      })
      it('Precedent 객체로 이루어진 배열을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent')
        expect(Array.isArray(res.body)).toBe(true)
        done()
      })
    })
  })

  describe('/precedent?type=', () => {
    describe('요청 성공시', () => {
      it('상태코드 200을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent?type=criminal')
        expect(res.status).toBe(200)
        done()
      })
      it('Precedent 객체로 이루어진 배열을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent')
        expect(Array.isArray(res.body)).toBe(true)
        done()
      })
      it('type에 맞는 Precedent만 가져온다.', async (done) => {
        res = await mockGetResponse(app, '/precedent?type=criminal')
        res.body.forEach((elem:PrecedentInstance) => {
          expect(elem.type).toBe('criminal')
        })
        done()
      })
    })
    describe('요청 실패시', () => {
      it('type이 criminal이나 civil이 아닐 경우 400를 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent?type=general')
        expect(res.status).toBe(400)
        done()
      })
    })
  })

  describe('/precedent?page=', () => {
    describe('요청 성공시', () => {
      it('상태코드 200을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent?page=1')
        expect(res.status).toBe(200)
        done()
      })
      it('5개의 precedent객체를 포함한 배열을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent?page=1')
        expect(res.body.length).toBe(5)
        done()
      })
    })
    describe('요청 실패시', () => {
      it('page가 정수가 아닐 경우 400을 반환한다.', async (done) => {
        res = await mockGetResponse(app, '/precedent?page=some')
        expect(res.status).toBe(400)
        done()
      })
    })
  })
})
