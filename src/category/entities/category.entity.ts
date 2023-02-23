import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.products)
  @JoinTable()
  ctname: Product[];
}
