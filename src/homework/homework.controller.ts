import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { HomeworkService } from './homework.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { HomeworkServiceAdmin } from './homework.service';

// @UseGuards(AdminGuard)
// @ApiBearerAuth()
@ApiTags('Homework', 'Admin')
@Controller('homework')
export class HomeworkControllerAdmin {
  constructor(private readonly HomeworkServiceAdmin: HomeworkServiceAdmin) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        title: { type: 'string' },
        description: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' },
        groupId: { type: 'number' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 2))
  @Post()
  async addHomework(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateHomeworkDto,
  ) {
    return this.HomeworkServiceAdmin.addHomework(files, body);
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' },
        groupId: { type: 'number' },
      },
    },
  })
  @Patch('')
  async updateHomework(@Body() body: UpdateHomeworkDto) {
    return this.HomeworkServiceAdmin.updateHomework(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.HomeworkServiceAdmin.remove(+id);
  }
}

@ApiTags('Homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}
  @Get()
  findAll() {
    return this.homeworkService.findAll();
  }

  // get homework by courator id
  @Get('byCourator/:id')
  async getHomeworkByCouratorId(@Param('id') id: string) {
    return await this.homeworkService.getHomeworkByCouratorId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(+id);
  }
}
