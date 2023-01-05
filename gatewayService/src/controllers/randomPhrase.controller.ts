import { NextFunction, Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import { HttpException } from "@exceptions/HttpException";
import RandomPhraseService from "@services/randomPhrase.service";
import axios from "axios";
import {serviceRandomPhrase, serviceAuth} from '@config'

class RandomPhraseController {
  public randomPhraseServices = RandomPhraseService;

  public randomPhrase = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    const dataResultAuth = await axios.get(`${serviceAuth}/api/auth/checkAuth`, config);

    const dataResult = await axios.get(`${serviceRandomPhrase}/api/randomPhrase`);
    resSend(res, {data: dataResult});
  })

}

export default RandomPhraseController;
