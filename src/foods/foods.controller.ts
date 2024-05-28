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
import { Food } from './food.entity';
import { CreateFoodBulkDto } from './dto/create-bulk-food.dto';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Get('/searchfood')
  getFoods(@Query() filterDto: GetFoodFilterDto): Promise<Food[]> {
    return this.foodService.getFoods(filterDto);
  }

  @Get('/:id')
  getFoodById(@Param('id') id: string): Promise<Food> {
    return this.foodService.getFoodById(id);
  }

  @Post('/addfood')
  createFood(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodService.createFood(createFoodDto);
  }

  @Post('/addbulk')
  async createBulk(
    @Body() createFoodBulkDto: CreateFoodBulkDto,
  ): Promise<Food[]> {
    return this.foodService.createBulk(createFoodBulkDto);
  }

  @Delete('/:id')
  deleteFoodById(@Param('id') id: string): Promise<void> {
    return this.foodService.deleteFoodById(id);
  }

  @Patch('/updatefood/:id')
  updateFood(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<Food> {
    return this.foodService.updateFood(id, updateFoodDto);
  }
}
