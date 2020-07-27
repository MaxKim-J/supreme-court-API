import express from 'express'
import ctrl from './precedent.ctrl'

const router = express.Router()

router.get('/', ctrl.index)

export default router
