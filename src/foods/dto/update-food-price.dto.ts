import { IsNumber } from 'class-validator';

export class UpdateFoodPriceDto {
  @IsNumber()
  price: number;
}
