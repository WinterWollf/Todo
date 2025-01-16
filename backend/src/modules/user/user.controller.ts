import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './dto/user.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(UserDTO, user);
  }

  @Get('/me')
  @UseGuards(TokenGuard)
  async me(@UserID() userId: number) {
    const user = await this.userService.findOne(userId);
    return plainToInstance(UserDTO, user);
  }
}
