import { IsOptional } from 'class-validator';

export class GetFoodFilterDto {
  @IsOptional()
  foodName?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  restaurant?: string;

  @IsOptional()
  rating?: number;
}
