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
import { Food } from './food.model';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Get()
  getFoods(@Query() filterDto: GetFoodFilterDto): Food[] {
    if (Object.keys(filterDto).length) {
      return this.foodService.getFoodWithFilter(filterDto);
    } else {
      return this.foodService.getAllFoods();
    }
  }

  //   @Get('/:category')
  //   getFoodsbyCategory(@Param('category') category: string): Food[] {
  //     return this.foodService.getFoodByCategory(category);
  //   }

  @Post()
  createFood(@Body() createfooddto: CreateFoodDto): Food {
    return this.foodService.createFood(createfooddto);
  }

  @Delete('/:id')
  deleteFoodById(@Param('id') id: string): void {
    return this.foodService.deleteFoodById(id);
  }

  @Patch('/:id/price')
  updateFoodPrice(@Param('id') id: string, @Body('price') price: number): Food {
    return this.foodService.updateFoodPrice(id, price);
  }
}
