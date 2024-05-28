import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { CreateFoodDto } from './create-foods.dto'; // Adjust the import path accordingly

export class CreateFoodBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFoodDto)
  foods: CreateFoodDto[];
}
