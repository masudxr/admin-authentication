import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuardAdmin } from 'src/guard/auth.admin.guard';
import { AuthCustomerGuard } from 'src/guard/auth.customer.guard';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthCustomerGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
  @UseGuards(AuthCustomerGuard)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @UseGuards(AuthCustomerGuard)
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.customersService.findOne(name);
  }

  @UseGuards(AuthCustomerGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
