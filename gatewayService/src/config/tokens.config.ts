import { TokensConfig } from "@interfaces/tokens.interface";

const tokenConfig: TokensConfig = {
    access: {
        secret: "Так сладок мёд, что, наконец, он горек. Избыток вкуса убивает вкус.",
        expiration: 7200 // 60 минут
    },
    refresh: {
        secret: "Ты пришёл и говоришь: Дон Корлеоне, мне нужна справедливость. Но ты просишь без уважения, ты не предлагаешь дружбу, ты даже не назвал меня крёстным отцом.",
        expiration: 2592000 // 30 дней
    }
}

export default tokenConfig;
