import express from 'express'
import precedentRouter from "./precedent"    
import tweetRouter from "./tweet"    

const router = express.Router();

router.use("/precedent", precedentRouter);
router.use("/tweet", tweetRouter);

export default router;
