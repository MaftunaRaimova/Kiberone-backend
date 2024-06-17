import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PollsController],
  providers: [PollsService, PrismaService, JwtService],
})
export class PollsModule {}
