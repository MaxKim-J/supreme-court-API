import app from '@/app'
import request from 'supertest'
import dbLoader from '@/models'

describe('GET /precedent는', () => {
  beforeEach(async () => { await dbLoader() })
  test('precedent 반환', async (done) => {
    const response = request(app).get('/precedent')
    console.log(response)
    done()
  })
})

export default 'ss'
