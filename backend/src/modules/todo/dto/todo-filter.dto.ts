import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ToDoFilterDTO {
  @IsOptional()
  @IsEnum(['title', 'description', 'done', 'createdAt', 'priority'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @Transform(({ value }) =>
    ['yes', 'true', '1', 'false', 'no', '0'].includes(value.toLowerCase().trim())
      ? ['yes', 'true', '1'].includes(value.toLowerCase().trim())
      : undefined
  )
  isDone?: boolean;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(3)
  priority?: number;
}
