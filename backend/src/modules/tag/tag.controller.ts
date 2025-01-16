import { Controller, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { TokenGuard } from '../auth/token.guard';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(TokenGuard)
  getAllTags() {
    return this.tagService.getAllTags();
  }
}
