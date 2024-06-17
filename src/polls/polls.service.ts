import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollDto, SubmitPollDto } from './dto/create-poll.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PollsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPoll(body: CreatePollDto) {
    return this.prisma.polls.create({
      data: {
        name: body.name,
        answers: body.answers,
        deadline: body.deadline,
      },
    });
  }

  async submitPoll(body: SubmitPollDto) {
    // Проверяем, существует ли родитель
    const parent = await this.prisma.parent.findUnique({
      where: { id: body.parentId },
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Проверяем, существует ли опрос
    const poll = await this.prisma.polls.findUnique({
      where: { id: body.pollId },
    });

    if (!poll) {
      throw new NotFoundException('Poll not found');
    }

    return this.prisma.pollResults.create({
      data: {
        parentId: body.parentId,
        pollId: body.pollId,
        answersIndex: body.answersIndex,
      },
    });
  }

  async getAllPolls() {
    return this.prisma.polls.findMany();
  }
  
  async getPollById(id: number) {
    const poll = await this.prisma.polls.findUnique({
      where: {
        id: id, // Передаем id как number
      },
    });

    if (!poll) {
      throw new NotFoundException('Poll not found');
    }

    return poll;
  }

  async getAllPollResults() {
    return this.prisma.polls.findMany({
      include: {
        PollResults: {
          include: {
            parent: true,
          },
        
        },
      },
    });
  }

  async getPollResults(pollId: number) {
    return this.prisma.pollResults.findMany({
      where: {
        pollId: pollId,
      },
      include: {
        parent: true,
        poll: true,
      },
    });
  }
}
