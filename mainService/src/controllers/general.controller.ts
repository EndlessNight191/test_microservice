import { NextFunction, Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import GeneralServices from "@services/general.services";
import {InfoId} from "@interfaces/users.intarface";

class GeneralController {
  generalService = new GeneralServices()

  //инфо об Id
  public info = catchAsync(async (req: Request, res: Response) => {
    const info: InfoId = await this.generalService.infoId(req.user);
    resSend(res, {
      data: info,
      accessToken: req.accessToken
    });
  })

  // задержку до гугла
  public latency = catchAsync(async (req: Request, res: Response) => {
    const time: number = await this.generalService.latency();
    resSend(res, {
      data: {
        latency: time
      },
      accessToken: req.accessToken
    })
  })


}

export default GeneralController;
