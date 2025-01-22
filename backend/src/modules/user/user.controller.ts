import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './dto/user.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';
import { UpdatePasswordDTO } from './dto/update-password.dto';

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

  @Get('/users')
  @UseGuards(TokenGuard)
  async users(@UserID() userId: number) {
    const users = await this.userService.returnAll();
    return plainToInstance(UserDTO, users);
  }

  @Put('/password')
  @UseGuards(TokenGuard)
  async updatePassword(
    @UserID() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ) {
    const { newPassword } = updatePasswordDto;
    await this.userService.updatePassword(userId, newPassword);
    return { message: 'Password updated successfully' };
  }

  @Get('/admin')
  @UseGuards(TokenGuard)
  async admin(@UserID() userId: number) {
    const user = await this.userService.findOne(userId);
    return plainToInstance(UserDTO, user);
  }
}
