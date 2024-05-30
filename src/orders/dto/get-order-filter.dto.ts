import { IsOptional, IsString } from 'class-validator';

export class GetOrderFilterDto {
  @IsOptional()
  @IsString()
  userId: string;
}
