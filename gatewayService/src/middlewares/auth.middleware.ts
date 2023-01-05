import {NextFunction} from "express";
import {HttpException} from '@exceptions/HttpException';
import catchAsync from "@utils/catchAsync";

const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const isProvided: string | null = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (!isProvided) throw new HttpException(401, "Token not provided");
  const providedToken = req.headers.authorization.split(' ')[1];
  const configToken = {headers: {
      authorization: `Bearer ${providedToken}`,
      "Content-Type": 'application/x-www-form-urlencoded'
  }};
  req.configToken = configToken;
  next()
})



export default authMiddleware;
