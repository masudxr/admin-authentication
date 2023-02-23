import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/passwordEncryption/bcrypt';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}
  create(customerDetails: CreateCustomerDto) {
    const password = encodePassword(customerDetails.password);
    console.log('New Post Password:', password);
    const newCustomer = this.customersRepository.create({
      ...customerDetails,
      password,
    });
    return this.customersRepository.save(newCustomer);
  }

  findAll() {
    return this.customersRepository.find();
  }

  findOne(name: string) {
    return this.customersRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepository.update({ id }, { ...updateCustomerDto });
  }

  remove(id: number) {
    return this.customersRepository.delete({ id });
  }
}
