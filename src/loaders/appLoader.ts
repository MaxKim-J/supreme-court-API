import morgan from 'morgan'
import express, {
  Express, Request, Response, NextFunction,
} from 'express'
import { Unauthorized } from '../errors/index'
import User from '../models/entities/user'
import configs from '../configs'
import router from '../routers'

const appLoader = (app: Express) => {
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.set('port', configs.APP.PORT)
  app.use(express.json({
    limit: '50mb',
  }))
  app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
  }))

  // Authorization middleware
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.path === '/') { return res.sendStatus(200) }
      const { authorization } = req.headers
      if (!authorization) { throw new Unauthorized() }
      const isInUserEntity:User | undefined = await User.findOne({ key: authorization })
      if (!isInUserEntity) { throw new Unauthorized() }
    } catch (e) {
      return next(e)
    }
    return next()
  })
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
