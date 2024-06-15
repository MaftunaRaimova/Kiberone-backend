import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ItemService, ItemServiceAdmin } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';
import { title } from 'process';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Item', 'Admin')
@Controller('item')
export class ItemControllerAdmin {
  constructor(private readonly itemServiceAdmin: ItemServiceAdmin) {}

  @Post()
  @ApiOperation({ summary: 'Create new item to homework' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema:{
      type: 'object',
      properties:{
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        title: { type: 'string' },
        homeworkId: { type: 'number' },
      }
    }
  })
  @UseInterceptors(FilesInterceptor('files', 2))
  async addItem(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateItemDto) {
      body.homeworkId = +body.homeworkId;
    return this.itemServiceAdmin.addItem(files, body);
    
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item by id' })
  remove(@Param('id') id: number) {
    return this.itemServiceAdmin.remove(+id);
  }
}

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  findAll() {
    return this.itemService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }
}