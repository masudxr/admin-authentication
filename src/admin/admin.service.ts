import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/passwordEncryption/bcrypt';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  findAll() {
    return this.adminRepository.find();
  }

  getById(id: number) {
    return this.adminRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  findOne(name: string) {
    return this.adminRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  create(adminDetails: CreateAdminDto) {
    const password = encodePassword(adminDetails.password);
    console.log('New Post Password:', password);
    const newAdmin = this.adminRepository.create({
      ...adminDetails,
      password,
    });
    return this.adminRepository.save(newAdmin);
  }

  update(id: number, updateAdminDetails: UpdateAdminDto) {
    return this.adminRepository.update({ id }, { ...updateAdminDetails });
  }

  delete(id: number) {
    return this.adminRepository.delete({ id });
  }
}
