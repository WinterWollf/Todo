import { HttpException } from '@nestjs/common';

export class UserNotfoundException extends HttpException {
  constructor() {
    super('Unauthorized User', 401);
  }
}
