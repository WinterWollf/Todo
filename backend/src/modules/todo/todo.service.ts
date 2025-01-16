import { Injectable } from '@nestjs/common';
import { CreateToDoDTO } from './dto/create-todo.dto';
import { EditToDoDTO } from './dto/edit-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ToDoFilterDTO } from './dto/todo-filter.dto';

@Injectable()
export class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async listToDo(userId: number, filter: ToDoFilterDTO) {
    const { sortBy = 'createdAt', sortOrder = 'desc', isDone, priority } = filter;

    return this.prisma.toDo.findMany({
      where: {
        userId,
        ...(isDone !== undefined && { done: isDone }),
        ...(priority !== undefined && { priority }),
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        tags: {
          select: {
            id: true,
            todoId: true,
            tagId: true,
          },
        },
      },
    });
  }


  async addToDo(data: CreateToDoDTO, userId: number) {
    const createdToDo = await this.prisma.toDo.create({
      data: {
        title: data.title,
        description: data.description,
        done: data.done,
        priority: data.priority,
        userId,
      },
    });

    if (data.tags && data.tags.length > 0) {
      await this.linkTagsToToDo(data.tags, createdToDo.id);
    }

    return this.getByID(createdToDo.id, userId);
  }


  async editToDo(id: number, data: EditToDoDTO, userId: number) {
    await this.prisma.toDoTag.deleteMany({
      where: { todoId: id },
    });

    await this.prisma.toDo.delete({
      where: { id },
    });

    const createdToDo = await this.prisma.toDo.create({
      data: {
        title: data.title,
        description: data.description,
        done: data.done ?? false,
        priority: data.priority ?? 1,
        userId,
      },
    });

    if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
      await this.linkTagsToToDo(data.tags, createdToDo.id);
    }

    return this.getByID(createdToDo.id, userId);
  }


  async deleteToDo(id: number) {
    await this.prisma.toDoTag.deleteMany({
      where: {
        todoId: id,
      },
    });

    return this.prisma.toDo.delete({
      where: {
        id,
      },
    });
  }


  async getByID(id: number, userId: number) {
    return this.prisma.toDo.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }


  private async linkTagsToToDo(tags: { id: number }[], toDoId: number) {
    const validTags = tags.filter(
      (tag) => tag.id !== undefined && tag.id !== null,
    );

    if (validTags.length === 0) {
      return;
    }

    const toDoTagRelations = validTags.map((tag) => ({
      todoId: toDoId,
      tagId: tag.id,
    }));

    await this.prisma.toDoTag.deleteMany({
      where: {
        todoId: toDoId,
      },
    });

    await this.prisma.toDoTag.createMany({
      data: toDoTagRelations,
    });
  }
}
