import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserDTO implements User {
  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;
  id: number;
  email: string;
}
