import { Module } from '@nestjs/common';
import { KiberoneService } from './kiberone.service';
import { KiberoneController } from './kiberone.controller';

@Module({
  controllers: [KiberoneController],
  providers: [KiberoneService],
})
export class KiberoneModule {}
