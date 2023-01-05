import { Router } from 'express';
import RandomPhraseController from '@controllers/randomPhrase.controller';
import { Routes } from '@interfaces/routes.interface';

class RandomPhraseRouter implements Routes {
  public path = '/randomPhrase';
  public router = Router();
  public randomPhraseController = new RandomPhraseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.randomPhraseController.randomPhrase);
  }
}

export default RandomPhraseRouter;
