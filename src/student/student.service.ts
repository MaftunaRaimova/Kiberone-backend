import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma.service';


@Injectable()
export class StudentServiceAdmin {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    const students = this.prisma.student.findMany({
      select:{
        id: true,
        name: true,
        age: true,
        login: true,
        password: true,
        isActive: true,
        groupId: true,
        parentId: true,
        _count:{
          select:{
            kiberones: true
          }
        }
      }
    });
    return students;
  }

  async create(body: CreateStudentDto) {
    if (! (await this.prisma.parent.findUnique({where: {login: body.login}})))
       {
    const student = await this.prisma.student.create({
      data: {
        ...body
      }
    })
    return student;
  }
  else {
    throw new HttpException('Login is already exist in parent', HttpStatus.BAD_REQUEST);
  }
}

  async findStudentById(id: number) {
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          id: id
        },
        select:{
          id: true,
          name: true,
          age: true,
          login: true,
          password: true,
          isActive: true,
          groupId: true,
          parentId: true,
          _count:{
            select:{
              kiberones: true
            }
          }
        }
      })
      return student;
    } catch (error) {
      throw new HttpException('Failed to update student', HttpStatus.BAD_REQUEST);
    }
  }

  async updateStudent(id: number, body: UpdateStudentDto) {
    try {
      const student = await this.prisma.student.update({
        where: {
          id: id
        },
        data: {
          ...body
        }
      })
      return student;
    } catch (error) {
      throw new HttpException('Failed to update student', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const student = await this.prisma.student.delete({
        where: {
          id: id
        }
      })
      return student;
    } catch (error) {
      throw new HttpException('Failed to delete student', HttpStatus.BAD_REQUEST);
    }
  }
}

