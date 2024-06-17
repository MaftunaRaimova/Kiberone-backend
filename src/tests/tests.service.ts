import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTestDto) {
    const test = await this.prisma.tests.create({
      data: {
        name: body.name,
        answer: body.answer,
        correctAnswer: body.correctAnswer,
        deadline: body.deadline,
      },
    });

    await Promise.all(
      body.answer.map((name, index) => {
        return this.prisma.testsResult.create({
          data: {
            name: name,
            testId: test.id,
            studentId: body.studentId, // Используем studentId из DTO
            isCorrect: index === body.correctAnswer,
          },
        });
      })
    );

    return test;
  }

  async findAll() {
    return this.prisma.tests.findMany({ include: { testResults: true } });
  }

  async findOne(id: number) {
    return this.prisma.tests.findUnique({
      where: { id },
      include: { testResults: true },
    });
  }

  async remove(id: number) {
    await this.prisma.tests.delete({ where: { id: id}})
  }
}
