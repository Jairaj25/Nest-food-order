import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async getAllOrders(): Promise<Order[]> {
    const foundOrder = await this.find();
    console.log('====================================');
    console.log(foundOrder);
    console.log('====================================');
    return foundOrder;
  }

  async getOrdersByUserId(
    getOrderFilterDto: GetOrderFilterDto,
  ): Promise<Order> {
    const { userId } = getOrderFilterDto;

    const foundFood = await this.findOneBy({ userId });

    if (!foundFood) {
      throw new NotFoundException(`Food with ID "${userId}" does not exist`);
    }

    return foundFood;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, restaurant, totalPrice, orderItems } = createOrderDto;

    const order = new Order();
    order.userId = userId;
    order.restaurant = restaurant;
    order.totalPrice = totalPrice;
    order.orderItems = orderItems;

    const savedOrder = await this.save(order);

    return savedOrder;
  }

  async deleteOrder(id: string): Promise<void> {
    const deletedOrder = await this.delete(id);

    if (deletedOrder.affected === 0) {
      throw new NotFoundException(
        `Order was not deleted. \n Reason: Order with ID: "${id}" does not exists`,
      );
    }
  }
}
