import { Router } from 'express';
import GeneralController from '@controllers/general.controller';
import { Routes } from '@interfaces/routes.interface';
import AuthMiddleware from "@middlewares/auth.middleware";

class RandomPhraseRoute implements Routes {
  public path = '/general';
  public router = Router();
  public generalController = new GeneralController();
  public authMiddleware = AuthMiddleware;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signIn`, this.generalController.signIn);
    this.router.post(`${this.path}/signUp`, this.generalController.signUp);
    this.router.get(`${this.path}/logout`, this.authMiddleware, this.generalController.logout);

    this.router.get(`${this.path}/latency`, this.authMiddleware, this.generalController.latency);
    this.router.get(`${this.path}/info`, this.authMiddleware, this.generalController.info);
  }
}

export default RandomPhraseRoute;
