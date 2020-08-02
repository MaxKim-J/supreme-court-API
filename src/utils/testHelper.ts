import request, { Response } from 'supertest'
import express, { Express } from 'express'
import loaders from '../loaders'

const loadApp = async ():Promise<Express> => {
  const app:Express = express()
  await loaders(app)
  return app
}

export const mockGetResponse = async (url:string):Promise<Response> => {
  const app:Express = await loadApp()
  const res:Response = await request(app).get(url)
  return res
}

export const mockPostResponse = async (url:string):Promise<Response> => {
  const app:Express = await loadApp()
  const res:Response = await request(app).post(url)
  return res
}
