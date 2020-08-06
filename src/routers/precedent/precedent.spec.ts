import { Response } from 'supertest'
import { Precedent } from '../../@types/supreme-court-api/precedent.d'
import { mockGetResponse } from '../../utils/testHelper'

describe('GET /precedent', () => {
  describe('/precedent', () => {
    let res:Response
    describe('요청 성공시', async () => {
      res = await mockGetResponse('/precedent')
      it('상태코드 200을 반환한다.', async (done) => {
        expect(res.status).toBe(200)
        done()
      })
      it('precedent[]를 반환한다', async (done) => {
        expect(res.body).toBe(200)
        done()
      })
    })
  })

  describe('/precedent?type=', () => {
    let res:Response
    describe('요청 성공시', async () => {
      res = await mockGetResponse('/precedent/?type=criminal')
      it('상태코드 200을 반환한다.', async (done) => {
        expect(res.status).toBe(200)
        done()
      })
      it('상태코드 200을 반환한다.', async (done) => {
        expect(res.status).toBe(200)
        done()
      })
    })
    describe('요청 실패시', async () => {
      res = await mockGetResponse('/precedent/?type=general')
      it('type이 criminal이나 civil이 아닐 경우 409를 뱉는다', async (done) => {
        expect(res.status).toBe(200)
        done()
      })
    })
  })

  describe('/precedent?page=', () => {
    let res:Response
    describe('요청 성공시', async () => {
      res = await mockGetResponse('/precedent/?page=2')
      it('상태코드 200을 반환한다.', async (done) => {
        expect(res.status).toBe(200)
        done()
      })
      it('5개의 precedent로 이루어진 precedent[]를 반환한다.', async (done) => {
        expect(res.body.length).toBe(5)
        done()
      })
    })
    describe('요청 실패시', async () => {
      res = await mockGetResponse('/precedent/?page=some')
      it('page가 정수가 아닐 경우 409를 반환한다.', async (done) => {
        expect(res.status).toBe(409)
        done()
      })
    })
  })
})
