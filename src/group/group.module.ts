import { Module } from '@nestjs/common';
import { GroupService, GroupServiceAdmin } from './group.service';
import { GroupController, GroupControllerAdmin } from './group.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GroupController, GroupControllerAdmin],
  providers: [GroupService, PrismaService, GroupServiceAdmin, JwtService],
})
export class GroupModule {}
