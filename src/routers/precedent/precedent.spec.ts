import { Response } from 'supertest'
import { mockGetResponse } from '../../utils/testHelper'

describe('GET /precedent는', () => {
  let res:Response
  beforeAll(async () => {
    res = await mockGetResponse('/precedent')
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
