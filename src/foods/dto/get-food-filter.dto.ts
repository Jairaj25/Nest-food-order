import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class GetFoodFilterDto {
  @IsOptional()
  @IsString()
  foodName: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  restaurant: string;

  @IsOptional()
  @IsDecimal()
  rating: number;
}
