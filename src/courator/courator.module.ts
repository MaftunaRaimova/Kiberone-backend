import { Module } from '@nestjs/common';
import { CouratorService } from './courator.service';
import { CouratorController } from './courator.controller';

@Module({
  controllers: [CouratorController],
  providers: [CouratorService],
})
export class CouratorModule {}
