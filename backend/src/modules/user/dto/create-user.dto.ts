import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsBoolean()
  admin: boolean;
}
