import { Module } from '@nestjs/common';
import { CouratorService } from './courator.service';
import { CouratorController } from './courator.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CouratorController],
  providers: [CouratorService, PrismaService, JwtService],
})
export class CouratorModule {}
