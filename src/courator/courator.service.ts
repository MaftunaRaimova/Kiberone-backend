import { Injectable } from '@nestjs/common';
import { CreateCouratorDto } from './dto/create-courator.dto';
import { UpdateCouratorDto } from './dto/update-courator.dto';

@Injectable()
export class CouratorService {
  create(createCouratorDto: CreateCouratorDto) {
    return 'This action adds a new courator';
  }

  findAll() {
    return `This action returns all courator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courator`;
  }

  update(id: number, updateCouratorDto: UpdateCouratorDto) {
    return `This action updates a #${id} courator`;
  }

  remove(id: number) {
    return `This action removes a #${id} courator`;
  }
}
