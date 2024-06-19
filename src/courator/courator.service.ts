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
      include:{ groups: {include :{group: true}}}
    })
  }
  
  async findCouratorById(id: number) {
    try {
      const courator = await this.prisma.courator.findUnique({
        where: {
          id: id,
        },
        include:{ groups: {include :{group: true}}} // have to check this line
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
