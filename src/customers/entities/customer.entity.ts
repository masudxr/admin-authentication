import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;
}
