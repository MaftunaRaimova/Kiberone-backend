import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { promises as fsPromises } from 'fs';
import { UpdateItemDto } from './dto/update-item.dto';
import saveFile from 'src/functions';

@Injectable()
export class ItemService {
  constructor(public readonly prisma: PrismaService) {}

  async findAll() {
    const items = await this.prisma.item.findMany();
    return items;
  }
  async findOne(id: number) {
    return await this.prisma.item.findUnique({
      where: { id: id },
    });
}
}

export class ItemServiceAdmin extends ItemService{
  
  async addItem(files: Express.Multer.File[], body: CreateItemDto) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }

    const file = files[0]; // Получаем первый файл из массива

    const filePath = await saveFile(file); // Сохраняем файл и получаем путь

    const item = await this.prisma.item.create({
      data: {
        fileUrl: filePath,
        title: body.title,
        homeworkId: body.homeworkId,
      },
    });

    return item;
  }
  async update(files: Express.Multer.File[], body: UpdateItemDto){
    const file = files[1];
    const filePath = await saveFile(file);
    const item = await this.prisma.item.update({
      where: { id: +body.id},
      data: {
        fileUrl: filePath,
        ...body,
      },
    });
    return item;
  }

  async remove(id: number) {
    try {
      const deletedItem = await this.prisma.item.delete({
        where: { id: id },
      });
      return deletedItem;
    } catch (error) {
      throw new HttpException(
        'Failed to delete item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}