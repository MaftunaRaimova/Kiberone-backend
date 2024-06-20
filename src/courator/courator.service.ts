import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCouratorDto } from './dto/create-courator.dto';
import { UpdateCouratorDto } from './dto/update-courator.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CouratorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateCouratorDto) {
    try {
      const courator = await this.prisma.courator.create({
        data: {
          name: body.name,
          login: body.login,
          password: body.password,
          groups: {
            create: body.groupIds.map((id) => ({
              group: { connect: { id } },
            })),
          },
        },
      });
      return courator;
    } catch (error) {
      throw new Error(`Failed to create courator: ${error.message}`);
    }
  }

  async findAllCourator() {
    return this.prisma.courator.findMany({
      include:{ 
        _count:{
          select:{
            kiberones: true
          }
        },
        groups: {include :{group: true}}
      },
    })
  }
  
  async findCouratorById(id: number) {
    try {
      const courator = await this.prisma.courator.findUnique({
        where: {
          id: id,
        },
        include: {
          _count:{
            select:{
              kiberones: true
            }
          },
          groups: {
            include: {
              group: true,
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
  
  async updateCourator(body: UpdateCouratorDto) {
    try {
      const id = +body.id;
      const courator = await this.prisma.courator.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
          login: body.login,
          password: body.password,
        },
      });
      
      await this.prisma.groupCourator.deleteMany({
        where: {
          couratorId: id,
        },
      });
      await this.prisma.groupCourator.createMany({
        data: body.groupIds.map((groupId) => ({
          couratorId: id,
          groupId: groupId,
        })),
      });
      
      return courator;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove( groupId: number, couratorId: number) {
    try {
      const groupCourator = await this.prisma.groupCourator.deleteMany({
        where: {
          couratorId,
          groupId,
        },
      });
      return groupCourator;
    } catch (error) {
      throw new HttpException(error.message ?? 'Failed to remove groupCourator', HttpStatus.BAD_REQUEST);
    }
  }
  async removeCourator(couratorId: number) {
    try {
      const courator = await this.prisma.courator.delete({
        where: {
          id: couratorId,
        },
      });
      return courator;
    } catch (error) {
      throw new HttpException(error.message ?? 'Failed to remove courator', HttpStatus.BAD_REQUEST);
    }
  }
}
