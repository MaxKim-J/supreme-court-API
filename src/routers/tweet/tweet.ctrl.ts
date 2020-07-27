import { Request, Response } from "express";

const index = function (req:Request, res:Response) {
    res.status(200).json('tweet API')
};

export default {
    index
}