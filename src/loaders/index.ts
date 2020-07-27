import { Express } from 'express'
import appLoader from './appLoader'
import dbLoader from './dbLoader'

const loaders = async (app:Express) => {
  await dbLoader()
  console.log('DB connected')
  appLoader(app)
}

export default loaders
