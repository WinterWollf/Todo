import { Module } from '@nestjs/common';
import { ToDoService } from './todo.service';
import { ToDoController } from './todo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ToDoService],
  controllers: [ToDoController],
  imports: [PrismaModule],
})
export class ToDoModule {}
