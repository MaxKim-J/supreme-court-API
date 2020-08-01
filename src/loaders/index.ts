import { Express } from 'express'
import morgan from 'morgan'
import appLoader from './appLoader'
import dbLoader from './dbLoader'

const loaders = async (app:Express) => {
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  await dbLoader()
  console.log('DB connected')
  appLoader(app)
}

export default loaders
