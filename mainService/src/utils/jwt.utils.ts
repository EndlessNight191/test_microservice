import tokenConfig from "@/config/tokens.config";
import {DecodedToken, TokensConfig} from "@interfaces/tokens.interface";
import jwt, {JwtPayload} from "jsonwebtoken";
import {HttpException} from "@exceptions/HttpException";


class jwtUtils {
  tokensConfig: TokensConfig = tokenConfig;

  public async generate(userId: string, typeId: string): Promise<string>{
    const accessToken: string = jwt.sign({
      userId: userId,
      typeId: typeId,
    }, this.tokensConfig.access.secret, {expiresIn: this.tokensConfig.access.expiration});

    return accessToken
  }

  public async decodedAccessToken(accessToken: string): Promise<JwtPayload | string>{
    const decoded: JwtPayload | string = await jwt.verify(accessToken, this.tokensConfig.access.secret);
    if(!decoded) new HttpException(400, "token is not valid");
    return decoded
  }

}

export default jwtUtils
