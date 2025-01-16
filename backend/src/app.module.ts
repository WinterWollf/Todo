import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoModule } from './modules/todo/todo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ToDoModule, PrismaModule, TokenModule, UserModule, AuthModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
