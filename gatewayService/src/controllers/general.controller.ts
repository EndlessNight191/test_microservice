import { NextFunction, Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import { HttpException } from "@exceptions/HttpException";
import GeneralService from "@services/general.service";
import axios from "axios";
import {DataResult} from "@interfaces/routes.interface";
import { serviceAuth } from '@config';

class RandomPhraseController {
  public generalService = GeneralService;

  public signIn = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.post(`${serviceAuth}/api/auth/signIn`, req.body, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        console.log(e)
        dataResult.text = e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    console.log(dataResult);
    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

  public signUp = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.post(`${serviceAuth}/api/auth/signUp`, req.body, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

  public logout = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.put(`${serviceAuth}/api/auth/logout?all=${(!!req.query.all)}`, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

  public latency = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.get(`${serviceAuth}/api/general/latency`, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

  public info = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.get(`${serviceAuth}/api/general/info`, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

}

export default RandomPhraseController;
