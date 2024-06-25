import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ParentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateParentDto) {
    // Проверить, существует ли логин у студентов
    const studentWithSameLogin = await this.prisma.student.findUnique({
      where: { login: body.login },
    });

    // Проверить, существует ли логин у родителей
    const parentWithSameLogin = await this.prisma.parent.findUnique({
      where: { login: body.login },
    });

    // Если логин найден у студента или другого родителя, выбросить исключение
    if (studentWithSameLogin || parentWithSameLogin) {
      throw new HttpException('Login already exists', HttpStatus.BAD_REQUEST);
    }

    // Создать родителя, если логин уникален
    const parent = await this.prisma.parent.create({
      data: {
        ...body,
      },
    });

    return parent;
  }

  async findAllParent() {
    const parent = await this.prisma.parent.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        name: true,
        login: true,
        password: true,
        phone: true,
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
    });
    return parent;
  }

  async findParentById(id: number) {
    try {
      const parent = await this.prisma.parent.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          login: true,
          password: true,
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
      });
      return parent;
    } catch (error) {
      throw new HttpException(
        'Failed to update parent',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateParent(body: UpdateParentDto) {
    try {
      const parent = await this.prisma.parent.update({
        where: {
          id: +body.id,
        },
        data: {
          ...body,
        },
      });
      return parent;
    } catch (error) {
      throw new HttpException(
        'Failed to update parent',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeParent(id: number) {
    try {
      const parent = await this.prisma.parent.delete({
        where: {
          id: id,
        },
      });
      return parent;
    } catch (error) {
      throw new HttpException(
        'Failed to delete parent',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
