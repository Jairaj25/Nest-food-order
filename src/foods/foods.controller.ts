import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';
import { UpdateFoodPriceDto } from './dto/update-food-price.dto';
import { foodEntity } from './food.entity';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Get('/search')
  getFoods(@Query() filterDto: GetFoodFilterDto): Promise<foodEntity[]> {
    return this.foodService.getFoods(filterDto);
  }

  @Get('/:id')
  getFoodById(@Param('id') id: string): Promise<foodEntity> {
    return this.foodService.getFoodById(id);
  }

  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto): Promise<foodEntity> {
    return this.foodService.createFood(createFoodDto);
  }

  @Delete('/:id')
  deleteFoodById(@Param('id') id: string): Promise<void> {
    return this.foodService.deleteFoodById(id);
  }

  @Patch('/:id/price')
  updateFoodPrice(
    @Param('id') id: string,
    @Body() updateFoodPriceDto: UpdateFoodPriceDto,
  ): Promise<foodEntity> {
    const { price } = updateFoodPriceDto;
    return this.foodService.updateFoodPrice(id, price);
  }
}
