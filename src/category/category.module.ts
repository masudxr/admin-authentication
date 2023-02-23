import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ProductsModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {}
