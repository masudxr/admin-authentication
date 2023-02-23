import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(productDetails: CreateCategoryDto) {
    const newProduct = this.categoryRepository.create({
      ...productDetails,
    });
    return this.categoryRepository.save(newProduct);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(name: string) {
    return this.categoryRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: number, updateCustomerDto: UpdateCategoryDto) {
    return this.categoryRepository.update({ id }, { ...updateCustomerDto });
  }

  remove(id: number) {
    return this.categoryRepository.delete({ id });
  }
  // findout ctg with products <many to many relation> get join table data
  async findWithproducts(id: number) {
    const ctgWithPro = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.ctname', 'products')
      .where('category.id = :id', { id: id })
      .getOne();
    console.log(JSON.stringify(ctgWithPro, null, 2));
    return ctgWithPro;
  }
  // add pro with ctg
  async addProToCtg(proId: number, ctgId: number) {
    const pro = await this.productRepository.findOne({
      where: {
        id: proId,
      },
    });
    console.log('pro', pro);
    console.log('ctgId:', ctgId);
    const ctg = await this.categoryRepository.findOne({
      relations: ['ctname'], //---left Join ctg and pro//
      where: {
        id: ctgId,
      },
    });
    console.log('ctg', ctg);
    if (ctg.ctname) {
      ctg.ctname.push(pro);
      console.log('hello defined');
    } else {
      ctg.ctname = [pro];
      console.log('hello undefined');
    }
    await this.categoryRepository.save(ctg);
  }

  // removed product from ctg which was created by many to many relation //
  async deleteFromctg(pId: number, cId: number) {
    const deleteProFromCtg = await this.categoryRepository.findOne({
      relations: ['ctname'],
      where: {
        id: cId,
      },
    });
    console.log('List with books:', deleteProFromCtg.ctname);
    deleteProFromCtg.ctname = deleteProFromCtg.ctname.filter((book) => {
      pId !== book.id;
    });
    await this.categoryRepository.save(deleteProFromCtg);
  }
}
