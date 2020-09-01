import morgan from 'morgan'
import express, {
  Express, Request, Response, NextFunction,
} from 'express'
import User from '../models/entities/user'
import configs from '../configs'
import router from '../routers'

const appLoader = (app: Express) => {
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.set('port', configs.APP.PORT)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Authorization middleware
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) { return res.status(403).json({ error: 'API KEY가 없습니다.' }) }
    const isInUserEntity:User | undefined = await User.findOne({ key: authorization })
    if (!isInUserEntity) { return res.status(403).json({ error: 'API KEY가 올바르지 않습니다' }) }
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
