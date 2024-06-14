import { Module } from '@nestjs/common';
import { LoginCouratorService } from './login-courator.service';
import { LoginCouratorController } from './login-courator.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LoginCouratorController],
  providers: [LoginCouratorService,PrismaService],
})
export class LoginCouratorModule {}
