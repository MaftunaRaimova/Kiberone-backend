import { Module } from '@nestjs/common';
import { KiberoneService } from './kiberone.service';
import { KiberoneController } from './kiberone.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [KiberoneController],
  providers: [KiberoneService, PrismaService, JwtService],
})
export class KiberoneModule {}
