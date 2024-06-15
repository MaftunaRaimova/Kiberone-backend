import { Module } from '@nestjs/common';
import { ItemService,ItemServiceAdmin } from './item.service';
import { ItemController,ItemControllerAdmin } from './item.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ItemController, ItemControllerAdmin],
  providers: [ItemService, ItemServiceAdmin, PrismaService, JwtService],
})
export class ItemModule {}
