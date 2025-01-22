import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @MinLength(6, {
    message: 'Password is too short. Minimum length is 6 characters.',
  })
  newPassword: string;
}
