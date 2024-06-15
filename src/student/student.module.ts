import { Module } from '@nestjs/common';
import { StudentServiceAdmin} from './student.service';
import { StudentControllerAdmin } from './student.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [StudentControllerAdmin],
  providers: [ PrismaService, JwtService, StudentServiceAdmin],
})
export class StudentModule {}
