import { Request, Response } from "express";

const index = function (req:Request, res:Response) {
    res.status(200).json('precedent API')
};

export default {
    index
}