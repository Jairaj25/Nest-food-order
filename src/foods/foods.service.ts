import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';
import { FoodRepository } from './food.repository';
import { foodEntity } from './food.entity';

@Injectable()
export class FoodsService {
  constructor(private foodRepository: FoodRepository) {}

  getFoods(foodFilterDto: GetFoodFilterDto): Promise<foodEntity[]> {
    return this.foodRepository.getFoods(foodFilterDto);
  }

  async getFoodById(id: string): Promise<foodEntity> {
    const foundFood = await this.foodRepository.findOneBy({ id });

    if (!foundFood) {
      throw new NotFoundException(`Food with ID "${id}" does not exist`);
    }

    return foundFood;
  }

  createFood(createFoodDto: CreateFoodDto): Promise<foodEntity> {
    return this.foodRepository.createFood(createFoodDto);
  }

  async deleteFoodById(id: string): Promise<void> {
    const deletedFood = await this.foodRepository.delete(id);

    if (deletedFood.affected === 0) {
      throw new NotFoundException(
        `Food with ID "${id}" was not deleted. \n Reason: Food with ID "${id}" does not exists`,
      );
    }
  }

  async updateFoodPrice(id: string, price: number): Promise<foodEntity> {
    const foundFood = await this.getFoodById(id);
    foundFood.foodPrice = price;
    await this.foodRepository.save(foundFood);
    return foundFood;
  }
}
