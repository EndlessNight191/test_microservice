import { TokensConfig } from "@interfaces/tokens.interface";

const tokenConfig: TokensConfig = {
    access: {
        secret: "Так сладок мёд, что, наконец, он горек. Избыток вкуса убивает вкус.",
        expiration: 600 // 10 минут
    }
}

export default tokenConfig;
