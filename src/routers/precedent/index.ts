import express from 'express'
import ctrl from './precedent.ctrl'

const router = express.Router()

router.get('/', ctrl.getAllPrecedents)

export default router
