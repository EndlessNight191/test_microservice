import { NextFunction, RequestHandler } from "express";
import catchAsync from "@utils/catchAsync";
import JwtUtils from "@utils/jwt.utils";
import {PrismaClient} from "@prisma/client";

const extendMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const jwtUtils = new JwtUtils();
  const tokens = new PrismaClient().tokens;

  const accessToken = await jwtUtils.generate(req.user.id, req.user.typeId);
  await tokens.create({data: {
      token: accessToken,
      userId: req.user.id
    }})

  // @ts-ignore
  await tokens.delete({where: {
      token: req.accessTokenOld,
    }}) // нужна ли эта логика?

  req.accessToken = accessToken
  next()
})



export default extendMiddleware;
