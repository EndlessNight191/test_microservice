import { HttpException } from "@exceptions/HttpException";
import {PrismaClient, User} from "@prisma/client";
import {InfoId} from "@interfaces/users.intarface";
import axios from "axios";

class GeneralServices {

  public async infoId(user: User) :Promise<InfoId>{
    return {id: user.id, typeId: user.typeId}
  }

  public async latency() :Promise<number>{
    const startTime: number = performance.now();

    await axios.get('https://google.com');

    const endTime: number = performance.now();
    return endTime - startTime
  }

}

export default GeneralServices;
