import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TagDTO {
  @IsInt()
  id: number;
}

export class CreateToDoDTO {
  @Length(5, 200)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Length(10, 1000)
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;

  @IsInt()
  @Min(1)
  @Max(3)
  @IsNotEmpty()
  priority: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDTO)
  tags: TagDTO[];
}
