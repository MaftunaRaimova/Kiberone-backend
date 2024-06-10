import { Module } from '@nestjs/common';
import { KiberoneService } from './kiberone.service';
import { KiberoneController } from './kiberone.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [KiberoneController],
  providers: [KiberoneService, PrismaService],
})
export class KiberoneModule {}
