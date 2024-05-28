import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';
import { FoodRepository } from './food.repository';
import { Food } from './food.entity';
import { UpdateFoodDto } from './dto/update-food.dto';
import { CreateFoodBulkDto } from './dto/create-bulk-food.dto';

@Injectable()
export class FoodsService {
  constructor(private foodRepository: FoodRepository) {}

  getFoods(foodFilterDto: GetFoodFilterDto): Promise<Food[]> {
    return this.foodRepository.getFoods(foodFilterDto);
  }

  async getFoodById(id: string): Promise<Food> {
    const foundFood = await this.foodRepository.findOneBy({ id });

    if (!foundFood) {
      throw new NotFoundException(`Food with ID "${id}" does not exist`);
    }

    return foundFood;
  }

  createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodRepository.createFood(createFoodDto);
  }

  createBulk(createFoodBulkDto: CreateFoodBulkDto): Promise<Food[]> {
    return this.foodRepository.createBulk(createFoodBulkDto);
  }

  async deleteFoodById(id: string): Promise<void> {
    const deletedFood = await this.foodRepository.delete(id);

    if (deletedFood.affected === 0) {
      throw new NotFoundException(
        `Food with ID "${id}" was not deleted. \n Reason: Food with ID "${id}" does not exists`,
      );
    }
  }

  async updateFood(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const { foodName, category, restaurant, rating, price } = updateFoodDto;
    const foundFood = await this.getFoodById(id);

    switch (true) {
      case !!foodName:
        foundFood.foodName = foodName;
        break;
      case !!category:
        foundFood.category = category;
        break;
      case !!restaurant:
        foundFood.restaurant = restaurant;
        break;
      case !!rating:
        foundFood.rating = rating;
        break;
      case !!price:
        foundFood.foodPrice = price;
        break;
      default:
        break;
    }

    await this.foodRepository.save(foundFood);
    return foundFood;
  }
}
