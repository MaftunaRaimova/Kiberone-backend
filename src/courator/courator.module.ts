import { Module } from '@nestjs/common';
import { CouratorService } from './courator.service';
import { CouratorController } from './courator.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CouratorController],
  providers: [CouratorService, PrismaService],
})
export class CouratorModule {}
