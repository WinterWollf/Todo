import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService],
  imports: [PrismaModule, UserModule],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
