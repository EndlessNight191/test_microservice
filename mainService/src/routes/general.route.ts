import { Router } from 'express';
import GeneralController from '@controllers/general.controller';
import { Routes } from '@interfaces/routes.interface';
import AuthMiddleware from "@middlewares/auth.middleware";
import ExtendMiddleware from "@middlewares/extend.middleware";
import validationMiddleware from "@middlewares/validation.middleware";

class GeneralRouter implements Routes {
  public path = '/general';
  public router = Router();
  public generalController = new GeneralController();
  public authMiddleware = AuthMiddleware;
  public extendMiddleware = ExtendMiddleware;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/info`, this.authMiddleware, this.extendMiddleware, this.generalController.info);
    this.router.get(`${this.path}/latency`, this.authMiddleware, this.extendMiddleware, this.generalController.latency);
  }
}

export default GeneralRouter;
