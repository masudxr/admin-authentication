import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuardAdmin } from 'src/guard/auth.admin.guard';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(AuthGuardAdmin)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  // findout ctg with products <many to many relation> get join table data
  @Get(':id/products')
  async findWithproducts(@Param('id', ParseIntPipe) id: number) {
    console.log('id', id);
    return await this.categoryService.findWithproducts(id);
  }

  @Post(':id/ctg/:cid')
  async addProToCtg(
    @Param('id', ParseIntPipe) id: number,
    @Param('cid', ParseIntPipe) cid: number,
  ) {
    console.log('id:', id);
    console.log('cid:', cid);
    return this.categoryService.addProToCtg(id, cid);
  }
  // delete product from list
  @Delete('/:pid/ctg/:cid')
  async deleteFromctg(
    @Param('pid', ParseIntPipe) pid: number,
    @Param('cid', ParseIntPipe) cid: number,
  ) {
    await this.categoryService.deleteFromctg(pid, cid);
  }
}
