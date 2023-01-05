import { NextFunction, Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import AuthorizationService from "@services/authorization.service";
import {isEmailValid, isPhoneValid} from "@utils/validate";

class AuthController {
  authService = new AuthorizationService()

  public signIn = catchAsync(async (req, res) => {
    if(!isEmailValid(req.body.id) && !isPhoneValid(req.body.id)) resSend(res, {message: 'not valid'}, 400);

    const accessToken: string = await this.authService.auth(req.body.id, req.body.password);
    resSend(res, {data: {
        accessToken: accessToken
      }})
  })

  public signUp = catchAsync(async (req, res) => {
    if(!isEmailValid(req.body.id) && !isPhoneValid(req.body.id)) resSend(res, {message: 'not valid'}, 400);

    const accessToken: string = await this.authService.registration(req.body.id, req.body.password);
    resSend(res, {data: {
        accessToken: accessToken
      }})
  })

  public logout = catchAsync(async (req, res) => {
    await this.authService.logout(req.query.all === 'true', req.user.id, req.accessTokenOld);
    resSend(res, {message: 'ok'})
  })

  public checkAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    return resSend(res, {data: {accessToken: req.accessToken}});
  })

}

export default AuthController;
