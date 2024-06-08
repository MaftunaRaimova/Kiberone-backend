import { Injectable } from '@nestjs/common';
import { CreateKiberoneDto } from './dto/create-kiberone.dto';
import { UpdateKiberoneDto } from './dto/update-kiberone.dto';

@Injectable()
export class KiberoneService {
  create(createKiberoneDto: CreateKiberoneDto) {
    return 'This action adds a new kiberone';
  }

  findAll() {
    return `This action returns all kiberone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kiberone`;
  }

  update(id: number, updateKiberoneDto: UpdateKiberoneDto) {
    return `This action updates a #${id} kiberone`;
  }

  remove(id: number) {
    return `This action removes a #${id} kiberone`;
  }
}
