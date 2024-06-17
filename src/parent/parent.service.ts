import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ParentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateParentDto) {
    if (!(await this.prisma.student.findUnique({ where: { login: body.login } }))) {
    const parent = await this.prisma.parent.create({
      data: {
        ...body
      }
    })
    return parent;
  }
  }
  async findAllParent() {
    const parent = await this.prisma.parent.findMany();
    return parent;
  }

  
  async findParentById(id: number) {
    try {
      const parent = await this.prisma.parent.findUnique({
        where: {
          id: id
        }
      })
      return parent;
    } catch (error) {
      throw new HttpException('Failed to update parent', HttpStatus.BAD_REQUEST);
    }
  }
    

  async updateParent(id: number, body: UpdateParentDto) {
    try {
      const parent = await this.prisma.parent.update({
        where: {
          id: id
        },
        data: {
          ...body
        }
      })
      return parent;
    } catch (error) {
      throw new HttpException('Failed to update parent', HttpStatus.BAD_REQUEST);
    }
  }

  async removeParent(id: number) {
    try {
      const parent = await this.prisma.parent.delete({
        where: {
          id: id
        }
      })
      return parent;
    } catch (error) {
      throw new HttpException('Failed to delete parent', HttpStatus.BAD_REQUEST);
    }
  }
}

