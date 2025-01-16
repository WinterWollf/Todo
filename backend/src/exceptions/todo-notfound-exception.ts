import { NotFoundException } from '@nestjs/common';

export class TodoNotfoundException extends NotFoundException {
  constructor() {
    super(`ToDo Not Found`);
  }
}
