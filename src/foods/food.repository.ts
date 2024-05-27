import { DataSource, Repository } from 'typeorm';
import { foodEntity } from './food.entity';
import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';

@Injectable()
export class FoodRepository extends Repository<foodEntity> {
  constructor(private dataSource: DataSource) {
    super(foodEntity, dataSource.createEntityManager());
  }

  async getFoods(foodFilterDto: GetFoodFilterDto): Promise<foodEntity[]> {
    const { foodName, category, restaurant, rating } = foodFilterDto;

    const query = this.createQueryBuilder('foodEntity');

    if (foodName) {
      query.andWhere('LOWER(foodEntity.foodName) LIKE LOWER(:foodName)', {
        foodName: `%${foodName}%`,
      });
    }

    if (category) {
      query.andWhere(
        "LOWER(:category) = ANY (string_to_array(LOWER(foodEntity.category), ','))",
        { category: category.toLowerCase() },
      );
    }

    if (restaurant) {
      query.andWhere('LOWER(foodEntity.restaurant) LIKE LOWER(:restaurant)', {
        restaurant: `${restaurant}`,
      });
    }

    if (rating) {
      query.andWhere('foodEntity.rating = :rating', { rating });
    }

    const food = await query.getMany();
    return food;
  }

  async createFood(createFoodDto: CreateFoodDto): Promise<foodEntity> {
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
}
