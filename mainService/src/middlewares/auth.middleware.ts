import { NextFunction, RequestHandler } from "express";
import { HttpException } from '@exceptions/HttpException';
import catchAsync from "@utils/catchAsync";
import { DecodedToken } from "@interfaces/tokens.interface";
import JwtUtils from "@utils/jwt.utils";
import {PrismaClient, User} from "@prisma/client";

const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const jwtUtils = new JwtUtils();
  const users = new PrismaClient().user;
  const tokens = new PrismaClient().tokens;

  const isProvided: string | null = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (!isProvided) throw new HttpException(401, "Token not provided");
  const providedToken: string = req.headers.authorization.split(' ')[1];
  const {userId, typeId}: DecodedToken = await jwtUtils.decodedAccessToken(providedToken);
  const token = await tokens.findUnique({where: {token: providedToken}});
  if(!token) throw new HttpException(401, "Token not valid");

  const user: User = await users.findUnique({where: {id: userId}});
  if(!user) throw new HttpException(401, "User not found");
  req.user = user;
  req.accessTokenOld = providedToken;
  next()
})



export default authMiddleware;
