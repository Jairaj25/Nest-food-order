import { IsArray, IsDecimal, IsOptional, IsString } from 'class-validator';

export class UpdateFoodDto {
  @IsOptional()
  @IsString()
  foodName: string;

  @IsOptional()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsArray()
  category: string[];

  @IsOptional()
  @IsString()
  restaurant: string;

  @IsOptional()
  @IsDecimal()
  rating: number;
}
