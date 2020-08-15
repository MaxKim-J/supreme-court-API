import express from 'express'
import ctrl from './precedent.ctrl'

const router = express.Router()

router.get('/', ctrl.getPrecedents)
router.post('/', ctrl.postPrecedents)

export default router
