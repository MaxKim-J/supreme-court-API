import { createConnection } from 'typeorm'

const dbLoader = () => createConnection()

export default dbLoader
