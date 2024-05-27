import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { foodEntity } from './food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodRepository } from './food.repository';

@Module({
  imports: [TypeOrmModule.forFeature([foodEntity])],
  controllers: [FoodsController],
  providers: [FoodsService, FoodRepository],
})
export class FoodsModule {}
