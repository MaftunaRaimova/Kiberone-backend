import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateResultDto, CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Tests', 'Admin')
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        answer: { type: 'array', items: { type: 'string' } },
        correctAnswer: { type: 'number' },
        deadline: { type: 'string', format: 'date-time' },
        groupId: { type: 'number' }, 
      },
    },
  })
  @Post()
  create(@Body() body: CreateTestDto) {
    return this.testsService.create(body);
  }

  @ApiBody({
    schema:{
      type: 'object',
      properties:{
        testId: { type: 'number' },
        studentId: { type: 'number' },
        testIndex: { type: 'number' }
      }
    }
  })
  @Post('result')
  createResult(@Body() body: CreateResultDto){
    return this.testsService.createResult(body);
  }

  @Get()
  findAll() {
    return this.testsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testsService.remove(+id);
  }
}
