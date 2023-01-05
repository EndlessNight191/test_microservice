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
    let dataResultAuth: any = {};
      await axios.get(`${serviceAuth}/api/auth/checkAuth`, config)
      .then(result => dataResultAuth = result.data)
      .catch(e => {
        dataResultAuth.text = e.response?.data?.message || e.response?.statusText;
        dataResultAuth.error = true;
        dataResultAuth.status = e.response?.status;
      })
    if(dataResultAuth.error) return resSend(res, {data: dataResultAuth}, Number(dataResultAuth.status));

    let dataResult: any = {};
      await axios.get(`${serviceRandomPhrase}/api/randomPhrase`, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response?.data?.message || e.response?.statusText;
        dataResult.error = true;
        dataResult.status = e.response?.status || 500;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult.data, accessToken: dataResultAuth?.data?.accessToken || null});
  })

}

export default RandomPhraseController;
