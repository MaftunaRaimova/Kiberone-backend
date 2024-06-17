import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
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
        studentId: { type: 'number' }, // Добавляем studentId
      },
    },
  })
  @Post()
  create(@Body() body: CreateTestDto) {
    return this.testsService.create(body);
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
