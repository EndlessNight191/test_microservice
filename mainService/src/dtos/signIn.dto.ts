import {IsEmail, IsOptional, IsPhoneNumber, IsString, Length, Validate} from 'class-validator';

export class SignInDto {
  @IsString()
  id: string

  @IsString()
  @Length(6, 25)
  password: string
}
