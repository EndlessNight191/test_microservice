import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import AuthMiddleware from "@middlewares/auth.middleware";
import ExtendMiddleware from "@middlewares/extend.middleware";
import validationMiddleware from "@middlewares/validation.middleware";
import {SignInDto} from "@dtos/signIn.dto";
import {LogoutDto} from "@dtos/logout.dto";

class AuthRouter implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();
  public authMiddleware = AuthMiddleware;
  public extendMiddleware = ExtendMiddleware;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signUp`, validationMiddleware(SignInDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/signIn`, validationMiddleware(SignInDto, 'body'), this.authController.signIn);

    this.router.put(`${this.path}/logout`, validationMiddleware(LogoutDto, 'query'), this.authMiddleware, this.authController.logout);
    this.router.get(`${this.path}/checkAuth`, this.authMiddleware, this.authController.checkAuth);
  }
}

export default AuthRouter;
