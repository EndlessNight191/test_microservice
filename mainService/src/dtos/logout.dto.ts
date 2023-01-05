import {IsBoolean, IsEnum, IsString} from 'class-validator';

enum All {
  true = 'true',
  false = 'false',
}

export class LogoutDto {
  @IsEnum(All)
  all: All
}
