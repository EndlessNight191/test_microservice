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
    console.log(`${serviceAuth}/api/auth/signIn`)
    const headers = {
        "Host": 0,
    }
    const options = {
      url: 'http://127.0.0.1:8080/api/auth/signIn',
      headers: headers
    }
    await request.post(options, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      dataResult = body
    });

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

  public signUp = catchAsync(async (req: Request, res: Response) => {
    let dataResult: DataResult | any = {};
    await axios.post(`${serviceAuth}/api/auth/signUp`, req.body)
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
    /*const config = req.configToken;*/
    let dataResult: DataResult | any = {};
    await axios({
      baseURL: serviceAuth,
      url: `/api/auth/logout?all=${(req.query.all === 'true')}`,
      method: 'put',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then(result => dataResult = result.data)
      .catch(e => {
        console.log(e)
        dataResult.text = e.response.statusText;
        dataResult.error = true;
        dataResult.status = e.response.status;
      })

    if(dataResult.error) return resSend(res, {data: dataResult}, Number(dataResult.status));
    resSend(res, {data: dataResult});
  })

  public latency = catchAsync(async (req: Request, res: Response) => {
    /*const config = req.configToken;*/
    let dataResult: DataResult | any = {};
    await axios.get(`${serviceAuth}/api/general/latency`, /*config*/)
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
    /*const config = req.configToken;*/
    let dataResult: DataResult | any = {};
    await axios.get(`${serviceAuth}/api/general/info`, /*config*/)
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

export default GeneralController;
