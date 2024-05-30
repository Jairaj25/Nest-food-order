import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { FoodRepository } from '../foods/food.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private foodRepository: FoodRepository,
  ) {}

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAllOrders();
  }

  getOrderByUserId(getOrderFilterDto: GetOrderFilterDto): Promise<Order> {
    return this.orderRepository.getOrdersByUserId(getOrderFilterDto);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    let totalPrice = 0;
    for (const item of createOrderDto.orderItems) {
      const food = await this.foodRepository.findOneBy({ id: item.foodId });

      if (!food) {
        throw new NotFoundException(
          `Operation failed, Food with ${item.foodId} does not exist`,
        );
      }

      if (item.quantity < 1) {
        throw new HttpException(
          'Invalid food item quantity',
          HttpStatus.BAD_REQUEST,
        );
      }

      totalPrice += food.foodPrice * item.quantity;
    }
    createOrderDto.totalPrice = totalPrice;
    return this.orderRepository.createOrder(createOrderDto);
  }

  deleteOrder(id: string): Promise<void> {
    return this.orderRepository.deleteOrder(id);
  }
}
