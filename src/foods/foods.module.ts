import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { Food } from './food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodRepository } from './food.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  controllers: [FoodsController],
  providers: [FoodsService, FoodRepository],
})
export class FoodsModule {}
