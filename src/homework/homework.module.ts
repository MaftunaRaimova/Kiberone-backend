import { Module } from '@nestjs/common';
import { HomeworkService , HomeworkServiceAdmin } from './homework.service';
import { HomeworkController, HomeworkControllerAdmin } from './homework.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HomeworkController, HomeworkControllerAdmin],
  providers: [HomeworkService, PrismaService, HomeworkServiceAdmin,JwtService],
})
export class HomeworkModule {}
