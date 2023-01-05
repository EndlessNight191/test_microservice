import {HttpException} from "@exceptions/HttpException";
import tokensConfig from "@/config/tokens.config";
import {PrismaClient, User} from "@prisma/client";
import {TypeId} from "@interfaces/users.intarface";
import {coded, decoded} from "@utils/bcrypt";
import JwtUtils from "@utils/jwt.utils";

class AuthorizationService {
  jwtUtils = new JwtUtils();
  users = new PrismaClient().user;
  tokens = new PrismaClient().tokens;

  public async registration(id: string, password: string): Promise<string>{
    const user = await this.users.findUnique({where: {id: id}});
    if(user) throw new HttpException(400, `a user with this id already exists`);
    let typeId: TypeId = 'phone';
    if(id.includes('@')) typeId = 'email';

    await this.users.create({
      data: {
        id: id,
        password: await coded(password),
        typeId: typeId,
      }
    })

    const accessToken: string = await this.jwtUtils.generate(id, typeId);
    await this.tokens.create({
      data: {
        token: accessToken,
        userId: id
      }
    })
    return accessToken
  }

  public async auth(id: string, password: string): Promise<string> {
    const user = await this.users.findUnique({where: {id: id}});
    if (!user) throw new HttpException(400, `a user with this id not already exists`);
    const checkPassword: boolean = await decoded(password, user.password);
    if (!checkPassword) throw new HttpException(403, `incorrect password`);

    const accessToken: string = await this.jwtUtils.generate(id, user.typeId);
    await this.tokens.create({
      data: {
        token: accessToken,
        userId: id
      }
    })

    return accessToken
  }

  public async logout(all: boolean, userId: string, token?: string): Promise<void>{
    if(all){
      await this.tokens.deleteMany({where: {
          userId: userId
        }})
      return
    }

    await this.tokens.delete({where: {token: token}});
    return
  }

}

export default AuthorizationService;
