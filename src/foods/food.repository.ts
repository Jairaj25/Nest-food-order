import { DataSource, Repository } from 'typeorm';
import { Food } from './food.entity';
import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';
import { CreateFoodBulkDto } from './dto/create-bulk-food.dto';

@Injectable()
export class FoodRepository extends Repository<Food> {
  constructor(private dataSource: DataSource) {
    super(Food, dataSource.createEntityManager());
  }

  async getFoods(foodFilterDto: GetFoodFilterDto): Promise<Food[]> {
    const { foodName, category, restaurant, rating } = foodFilterDto;

    const query = this.createQueryBuilder('Food');

    if (foodName) {
      query.andWhere('LOWER(Food.foodName) LIKE LOWER(:foodName)', {
        foodName: `%${foodName}%`,
      });
    }

    if (category) {
      query.andWhere(
        "LOWER(:category) = ANY (string_to_array(LOWER(Food.category), ','))",
        { category: category.toLowerCase() },
      );
    }

    if (restaurant) {
      query.andWhere('LOWER(Food.restaurant) LIKE LOWER(:restaurant)', {
        restaurant: `${restaurant}`,
      });
    }

    if (rating) {
      query.andWhere('Food.rating = :rating', { rating });
    }

    const food = await query.getMany();
    return food;
  }

  async createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const { foodName, image, foodPrice, restaurant, category, rating } =
      createFoodDto;

    const food = this.create({
      foodName,
      image,
      foodPrice,
      restaurant,
      category,
      rating,
    });

    await this.save(food);
    return food;
  }

  async createBulk(createFoodBulkDto: CreateFoodBulkDto): Promise<Food[]> {
    const foods = this.create(createFoodBulkDto.foods);
    return this.save(foods);
  }
}
