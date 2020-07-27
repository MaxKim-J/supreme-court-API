import express from 'express';
import ctrl from './tweet.ctrl'

const router = express.Router()

router.get("/", ctrl.index)

export default router