import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  stock: string;

  @ManyToMany(() => Category, (category) => category.ctname)
  products: Category[];
}
