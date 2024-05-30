import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/getall')
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('/search/:id')
  getOrdersbyUserId(@Param('id') userId: string): Promise<Order> {
    return this.orderService.getOrderByUserId(userId);
  }

  @Post('/create')
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Delete('/delete')
  deleteOrder(@Param('id') id: string): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
