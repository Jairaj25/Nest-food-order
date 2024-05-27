import { IsDecimal } from 'class-validator';

export class UpdateFoodPriceDto {
  @IsDecimal()
  price: number;
}
