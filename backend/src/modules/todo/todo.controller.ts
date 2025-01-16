import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ToDoService } from './todo.service';
import { CreateToDoDTO } from './dto/create-todo.dto';
import { EditToDoDTO } from './dto/edit-todo.dto';
import { ToDoFilterDTO } from './dto/todo-filter.dto';
import { TodoNotfoundException } from '../../exceptions/todo-notfound-exception';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';

@Controller('todo')
@UseGuards(TokenGuard)
export class ToDoController {
  constructor(private readonly todoService: ToDoService) {}

  @Get()
  @Get()
  listToDo(@Query() filter: ToDoFilterDTO, @UserID() userId: number) {
    return this.todoService.listToDo(userId, filter);
  }


  @Get(':id')
  async getToDo(
    @Param('id', ParseIntPipe) id: number,
    @UserID() userId: number,
  ) {
    const todo = await this.todoService.getByID(id, userId);
    if (!todo) {
      throw new TodoNotfoundException();
    }
    return todo;
  }

  @Post()
  addToDo(@Body() data: CreateToDoDTO, @UserID() userId: number) {
    return this.todoService.addToDo(data, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteToDo(
    @Param('id', ParseIntPipe) id: number,
    @UserID() userId: number,
  ) {
    const todo = await this.todoService.getByID(id, userId);
    if (!todo) {
      throw new TodoNotfoundException();
    }
    await this.todoService.deleteToDo(id);
  }

  @Put(':id')
  async editToDo(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditToDoDTO,
    @UserID() userId: number,
  ) {
    const todo = await this.todoService.getByID(id, userId);
    if (!todo) {
      throw new TodoNotfoundException();
    }
    return this.todoService.editToDo(id, data, userId);
  }
}