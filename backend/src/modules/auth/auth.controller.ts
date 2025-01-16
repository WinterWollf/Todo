import { Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { BasicGuard } from './basic.guard';
import { UserID } from './user.decorator';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('login')
  @UseGuards(BasicGuard)
  @HttpCode(HttpStatus.OK)
  login(@UserID() userId: number, @Res({ passthrough: true }) res: Response) {
    const token = this.tokenService.createToken(userId);

    res.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1h
    });
    res.cookie('is_logged', true, {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1h
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('is_logged');
  }
}
