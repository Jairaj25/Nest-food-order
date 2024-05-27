import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class foodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  foodName: string;

  @Column()
  image: string;

  @Column({ type: 'decimal' })
  foodPrice: number;

  @Column()
  restaurant: string;

  @Column('simple-array')
  category: string[];

  @Column('decimal')
  rating: number;
}
