import {NextFunction, Request, Response} from "express";
import {HttpException} from "@exceptions/HttpException";

const catchAsync = (fn) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(e =>{
  next(new HttpException(e.status || 500, e.message || 'error'))
  console.error(e)
})

export default catchAsync
