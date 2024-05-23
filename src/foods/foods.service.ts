import { Injectable, NotFoundException } from '@nestjs/common';
import { Food } from './food.model';
import { v4 as uuid } from 'uuid';
import { CreateFoodDto } from './dto/create-foods.dto';
import { GetFoodFilterDto } from './dto/get-food-filter.dto';

@Injectable()
export class FoodsService {
  private foods: Food[] = [];

  getAllFoods() {
    return this.foods;
  }

  getFoodWithFilter(filterDto: GetFoodFilterDto): Food[] {
    const { foodName, category, restaurant, rating } = filterDto;

    let food = this.getAllFoods();

    if (foodName) {
      food = this.foods.filter((item) => item.foodName === foodName);
    }

    if (category) {
      food = this.foods.filter((item) =>
        item.category
          .map((cat) => cat.toLowerCase())
          .includes(category.toLowerCase()),
      );
    }

    if (restaurant) {
      food = this.foods.filter((item) => item.restaurant === restaurant);
    }

    if (rating) {
      food = this.foods.filter((item) => item.rating === rating);
    }

    return food;
  }

  getFoodById(id: string): Food {
    const foundFood = this.foods.find((item) => item.id === id);

    if (!foundFood) {
      throw new NotFoundException();
    }

    return foundFood;
  }

  //   getFoodByCategory(category: string) {
  //     return this.foods.filter((item) =>
  //       item.category
  //         .map((cat) => cat.toLowerCase())
  //         .includes(category.toLowerCase()),
  //     );
  //   }

  createFood(CreateFoodDto: CreateFoodDto): Food {
    const { foodName, image, foodPrice, restaurant, category, rating } =
      CreateFoodDto;
    const food: Food = {
      id: uuid(),
      foodName,
      image,
      foodPrice,
      restaurant,
      category,
      rating,
    };
    this.foods.push(food);
    return food;
  }

  deleteFoodById(id: string): void {
    const foundFood = this.getFoodById(id);
    this.foods = this.foods.filter((item) => item.id !== foundFood.id);
  }

  updateFoodPrice(id: string, price: number) {
    const food = this.getFoodById(id);
    food.foodPrice = price;
    return food;
  }
}
