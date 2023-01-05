interface TokenConfig {
  secret: string,
  expiration: number
}

export interface TokensConfig {
  access: TokenConfig
}

export interface DecodedToken {
  userId: string,
  typeId: string
}
