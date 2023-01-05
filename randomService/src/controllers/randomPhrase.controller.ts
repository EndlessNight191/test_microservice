import { NextFunction, Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import { HttpException } from "@exceptions/HttpException";
import RandomPhraseService from "@services/randomPhrase.service";

class RandomPhraseController {
  public randomPhraseServices = new RandomPhraseService();

  public randomPhrase = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const phrase: string = await this.randomPhraseServices.randomPhrase();
    return resSend(res, {data: {phrase: phrase}});
  })

}

export default RandomPhraseController;
