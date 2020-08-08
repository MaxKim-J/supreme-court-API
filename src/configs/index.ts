import dotenv from 'dotenv'

let path:string = ''

switch (process.env.NODE_ENV) {
  case 'production':
    path = `${__dirname}/env/prod.env`
    break
  case 'development':
    path = `${__dirname}/env/dev.env`
    break
  case 'test':
    path = `${__dirname}/env/test.env`
    break
  default:
    path = `${__dirname}/env/dev.env`
    break
}

dotenv.config({ path })

export default {
  ENV: process.env.NODE_ENV,
  APP: {
    PORT: Number(process.env.APP_PORT),
  },
  DB: {
    PORT: Number(process.env.DB_PORT),
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
}
