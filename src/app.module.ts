import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CouratorModule } from './courator/courator.module';
import { GroupModule } from './group/group.module';
import { KiberoneModule } from './kiberone/kiberone.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [StudentModule, CouratorModule, GroupModule, KiberoneModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
