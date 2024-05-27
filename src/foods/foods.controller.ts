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
import { UpdateFoodDto } from './dto/update-food.dto';
import { foodEntity } from './food.entity';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Get('/searchfood')
  getFoods(@Query() filterDto: GetFoodFilterDto): Promise<foodEntity[]> {
    return this.foodService.getFoods(filterDto);
  }

  @Get('/:id')
  getFoodById(@Param('id') id: string): Promise<foodEntity> {
    return this.foodService.getFoodById(id);
  }

  @Post('/addfood')
  createFood(@Body() createFoodDto: CreateFoodDto): Promise<foodEntity> {
    return this.foodService.createFood(createFoodDto);
  }

  @Delete('/:id')
  deleteFoodById(@Param('id') id: string): Promise<void> {
    return this.foodService.deleteFoodById(id);
  }

  @Patch('/updatefood/:id')
  updateFood(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<foodEntity> {
    return this.foodService.updateFood(id, updateFoodDto);
  }
}
