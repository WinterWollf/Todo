import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class EditToDoDTO {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id: number;

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
  tags: { id: number }[];
}
