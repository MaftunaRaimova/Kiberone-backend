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
    const courator = await this.prisma.courator.findMany({
      select: {
        id: true,
        name: true,
        login: true,
        password: true,
        groups: {
          select: {
            id: true,
            name: true,
            description: true,
            students: {
              select: {
                id: true,
                name: true,
                age: true,
                login: true,
                password: true,
                isActive: true,
                _count: {
                  select: {
                    kiberones: true, 
                  },
                },
              },
            },
          },
        },
      },
    });
    return courator;
  }
  
  async findCouratorById(id: number) {
    try {
      const courator = await this.prisma.courator.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          login: true,
          password: true,
          groups: {
            select: {
              id: true,
              name: true,
              description: true,
              students: {
                select: {
                  id: true,
                  name: true,
                  age: true,
                  login: true,
                  password: true,
                  isActive: true,
                  _count: {
                    select: {
                      kiberones: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!courator) {
        throw new HttpException('Courator not found', HttpStatus.NOT_FOUND);
      }
      return courator;
    } catch (error) {
      throw new HttpException('Failed to find courator', HttpStatus.BAD_REQUEST);
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
