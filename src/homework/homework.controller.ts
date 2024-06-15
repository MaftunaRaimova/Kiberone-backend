import { Controller, Post, Body, UploadedFiles, UseInterceptors, UseGuards, Get, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { HomeworkService } from './homework.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { HomeworkServiceAdmin } from './homework.service'

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Homework', 'Admin')
@Controller('homework')
export class HomeworkControllerAdmin {
  constructor(private readonly HomeworkServiceAdmin: HomeworkServiceAdmin) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' },
        groupId: { type: 'number' },
      },
    },
  })
  @Post()
  async addHomework(@Body() body: CreateHomeworkDto) {
    return this.HomeworkServiceAdmin.addHomework(body);
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' },
        groupId: { type: 'number' },
      },
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateHomeworkDto) {
    return this.HomeworkServiceAdmin.updateHomework(+id, body);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(+id);
  }
}
