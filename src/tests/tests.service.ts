import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto, CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTestDto) {
    try {
      const test = await this.prisma.tests.create({
        data: {
          name: body.name,
          answer: body.answer,
          correctAnswer: body.correctAnswer,
          deadline: body.deadline,
          groupId: body.groupId,
        },
      });
      return test;
    } catch (error) {
      throw new HttpException('Failed to create test', HttpStatus.BAD_REQUEST);
    }
  }

  async createResult(body: CreateResultDto) {
    const test = await this.prisma.tests.findUnique({
      where: { id: body.testId },
    });

    if (!test) {
      throw new HttpException('Test not found', HttpStatus.BAD_REQUEST);
    }

    const student = await this.prisma.student.findUnique({
      where: { id: body.studentId },
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.prisma.testsResult.create({
        data: {
          testId: body.testId,
          studentId: body.studentId,
          testIndex: body.testIndex,
          isCorrect: test.correctAnswer === body.testIndex,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException('Failed to create test result', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return this.prisma.tests.findMany({
       include: { testResults: true } 
      });
  }

  async findOne(id: number) {
    return this.prisma.tests.findUnique({
      where: { id },
      include: { testResults: true },
    });
  }

  async remove(id: number) {
    await this.prisma.testsResult.deleteMany({ where: { testId: id } });
    await this.prisma.tests.deleteMany({ where: { id: id}})
  }
}
