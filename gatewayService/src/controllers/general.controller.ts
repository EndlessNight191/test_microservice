import { Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import axios from "axios";
import {DataResult} from "@interfaces/routes.interface";
import { serviceAuth } from '@config';
import request from "request";

class GeneralController {

  public signIn = catchAsync(async (req: Request, res: Response) => {
    let dataResult: DataResult | any = {};

    await axios.post(`${serviceAuth}/api/auth/signIn`, req.body)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response?.data?.message || e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult.data});
  })

  public signUp = catchAsync(async (req: Request, res: Response) => {
    let dataResult: DataResult | any = {};
    await axios.post(`${serviceAuth}/api/auth/signUp`, req.body)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response?.data?.message || e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult.data});
  })

  public logout = catchAsync(async (req: Request, res: Response) => {
    if(!req.query.all) return resSend(res, {message: 'not valid "all"'}, 400);

    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.put(`${serviceAuth}/api/auth/logout?all=${(req.query.all === 'true')}`, req.body, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response?.data?.message || e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult.data});
  })

  public latency = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.get(`${serviceAuth}/api/general/latency`, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response?.data?.message || e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult.data, accessToken: dataResult.accessToken || null});
  })

  public info = catchAsync(async (req: Request, res: Response) => {
    const config = req.configToken;
    let dataResult: DataResult | any = {};
    await axios.get(`${serviceAuth}/api/general/info`, config)
      .then(result => dataResult = result.data)
      .catch(e => {
        dataResult.text = e.response?.data?.message || e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult.data, accessToken: dataResult.accessToken || null});
  })

}

export default GeneralController;
