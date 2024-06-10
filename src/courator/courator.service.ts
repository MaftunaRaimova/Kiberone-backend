import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCouratorDto } from './dto/create-courator.dto';
import { UpdateCouratorDto } from './dto/update-courator.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CouratorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateCouratorDto) {
    const courator = await this.prisma.courator.create({
      data: {
        ...body
      }
    })
    return courator;
  }

  async findAllCourator() {
    const courator = await this.prisma.courator.findMany();
    return courator;
  }

  
  async findCouratorById(id: number) {
    try {
      const courator = await this.prisma.courator.findUnique({
        where: {
          id: id
        }
      })
      return courator;
    } catch (error) {
      throw new HttpException('Failed to update courator', HttpStatus.BAD_REQUEST);
    }
  }
    

  async updateCourator(id: number, body: UpdateCouratorDto) {
    try {
      const courator = await this.prisma.courator.update({
        where: {
          id: id
        },
        data: {
          ...body
        }
      })
      return courator;
    } catch (error) {
      throw new HttpException('Failed to update courator', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const courator = await this.prisma.courator.delete({
        where: {
          id: id
        }
      })
      return courator;
    } catch (error) {
      throw new HttpException('Failed to delete courator', HttpStatus.BAD_REQUEST);
    }
  }
}
