import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
@Injectable()
export class HomeworkService {
  constructor(public readonly prisma: PrismaService) {}

  async findAll() {
    const homework = await this.prisma.homework.findMany({
      orderBy: {
        deadline: 'asc',
      },
    });
    return homework;
  }

  async getHomeworkByCouratorId(couratorId: number) {
    // group
    return this.prisma.homework.findMany({
      orderBy: {
        deadline: 'desc',
      },
      include: {
        group: true,
      },
      where: {
        group: {
          courators: {
            some: {
              couratorId,
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.homework.findUnique({
      where: {
        id: id,
      },
    });
  }
}

export class HomeworkServiceAdmin extends HomeworkService {
  async addHomework(files: Express.Multer.File[], body: CreateHomeworkDto) {
    try {
      console.log(files);
      // save files
      if (files) {
        const filesPath = [];
        for (const file of files) {
          const filePath = `./uploads/${file.originalname}`;
          filesPath.push(filePath);
          fs.writeFileSync(filePath, file.buffer);
        }
        body.files = filesPath;
        body.groupId = +body.groupId;
        return await this.prisma.homework.create({
          data: {
            ...body,
          },
        });
      } else {
        body.groupId = +body.groupId;
        return await this.prisma.homework.create({
          data: {
            ...body,
          },
        });
      }
    } catch (error) {
      console.log(error);
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
      throw new HttpException(
        'Failed to update homework',
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        'Failed to delete homework',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
