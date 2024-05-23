import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  foodName: string;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  foodPrice: number;

  @IsNotEmpty()
  restaurant: string;

  @IsNotEmpty()
  category: string[];

  @IsNotEmpty()
  rating: number;
}
