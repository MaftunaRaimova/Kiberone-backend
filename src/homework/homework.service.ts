import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HomeworkService {
  constructor(public readonly prisma: PrismaService) {}

  async findAll() {
    const homework = await this.prisma.homework.findMany({
      select: {
        id: true,
        title: true,
        deadline: true,
        groupId: true,
        item: {
          select: {
            id: true,
            title: true,
            fileUrl: true,
            homeworkId: true,
          },
        },
      },
      orderBy: {
        deadline: 'asc',
      },
    });
    return homework;
  }


  async findOne(id: number) {
    return await this.prisma.homework.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        deadline: true,
        groupId: true,
        item: {
          select: {
            id: true,
            title: true,
            fileUrl: true,
            homeworkId: true,
          },
        },
      },
    })
    
 }
} 

export class HomeworkServiceAdmin extends HomeworkService{
  

  async addHomework(body: CreateHomeworkDto) {
    try {
      const homework = await this.prisma.homework.create({
        data: {
          ...body,
        },
      });
      return homework;
    } catch (error) {
      throw new HttpException('Failed to add homework', HttpStatus.BAD_REQUEST);
    }
  }

  async updateHomework(body: UpdateHomeworkDto) {
    try {
      const id = +body.id;
      return await this.prisma.homework.update({
        where: {
          id: id,
        },
        data: {
          ...body,
        },
      });
    } catch (error) {
      throw new HttpException('Failed to update homework', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.homework.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Failed to delete homework', HttpStatus.BAD_REQUEST);
    }
  }
}
