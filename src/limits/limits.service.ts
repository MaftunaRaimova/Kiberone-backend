import { Injectable } from '@nestjs/common';
import { CreateLimitDto } from './dto/create-limit.dto';
import { UpdateLimitDto } from './dto/update-limit.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LimitsService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(body: CreateLimitDto) {
    return this.prisma.limits.create({
      data: {
        ...body
      }
    
    })
  }

  async findAll() {
    return await this.prisma.limits.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.limits.findUnique({
      where:{
        id: id 
      }
    })
  }

  async update(body: UpdateLimitDto) {
    return await this.prisma.limits.update({
      where:{
        id: +body.id
      },
      data:{
        ...body
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.limits.delete({
      where:{
        id: id
      }
    })
  }
}
