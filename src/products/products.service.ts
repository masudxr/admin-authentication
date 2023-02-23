import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(productDetails: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...productDetails,
    });
    return this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(name: string) {
    return this.productRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: number, updateCustomerDto: UpdateProductDto) {
    return this.productRepository.update({ id }, { ...updateCustomerDto });
  }

  remove(id: number) {
    return this.productRepository.delete({ id });
  }

  // findout products with ctg <many to many relation> get join table data
  async findWithctg(id: number) {
    const proWithCtg = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.products', 'ctname')
      .where('product.id = :id', { id: id })
      .getOne();
    console.log(JSON.stringify(proWithCtg, null, 2));
    return proWithCtg;
  }
}
