import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrdersByUserId(userId: string): Promise<Order> {
    try {
      const foundFood = await this.findOneBy({ userId });

      if (!foundFood) {
        throw new HttpException(
          `Food with ID "${userId}" does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return foundFood;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { userId, restaurant, totalPrice, orderItems } = createOrderDto;

      const order = new Order();
      order.userId = userId;
      order.restaurant = restaurant;
      order.totalPrice = totalPrice;
      order.orderItems = orderItems;

      const savedOrder = await this.save(order);
      return savedOrder;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof HttpException
      ) {
        throw error;
      } else {
        throw new HttpException(
          'An unexpected error occurred while creating the order',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      const deletedOrder = await this.delete(id);

      if (deletedOrder.affected === 0) {
        throw new NotFoundException(
          `Order was not deleted. \n Reason: Order with ID: "${id}" does not exists`,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
