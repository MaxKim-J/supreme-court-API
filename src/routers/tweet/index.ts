import express from 'express'
import ctrl from './tweet.ctrl'

const router = express.Router()

router.get('/', ctrl.getAllTweets)
router.get('/current', ctrl.getCurrentTweet)
router.get('/previous', ctrl.getPreviousTweet)

export default router
