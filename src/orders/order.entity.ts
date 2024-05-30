import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column()
  userId: string;

  @Column('jsonb')
  orderItems: {
    foodId: string;
    quantity: number;
  }[];

  @Column()
  restaurant: string;

  @Column({ type: 'decimal' })
  totalPrice: number;
}
