import { Router } from 'express';
import RandomPhraseController from '@controllers/randomPhrase.controller';
import { Routes } from '@interfaces/routes.interface';
import AuthMiddleware from "@middlewares/auth.middleware";

class RandomPhraseRoute implements Routes {
  public path = '/randomPhrase';
  public router = Router();
  public randomPhraseController = new RandomPhraseController();
  public authMiddleware = AuthMiddleware;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware, this.randomPhraseController.randomPhrase);
  }
}

export default RandomPhraseRoute;
