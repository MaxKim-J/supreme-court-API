import morgan from 'morgan'
import express, {
  Express, Request, Response, NextFunction,
} from 'express'

import configs from '../configs'
import router from '../routers'

const appLoader = (app: Express) => {
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.set('port', configs.APP.PORT)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('', router)

  // error processing middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      message: err.message,
      statusCode: err.statusCode,
      error: configs.ENV === 'prod' ? null : err,
    })
  })
}

export default appLoader
