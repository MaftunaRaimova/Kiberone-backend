import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        login: { type: 'string' },
        password: { type: 'string' },
        isActive: { type: 'string' },
        couratorId: { type: 'number' },
        groupId: { type: 'number'}
      },
    },
  })
  @Post()
    async addStudent(
      @Body()
      body: CreateStudentDto,

    )
    
  {
    body.age = +body.age;
    return this.studentService.create(body);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findStudentById(+id);
  }

  @Patch(':id') 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        login: { type: 'string' },
        password: { type: 'string' },
        isActive: { type: 'string' },
        couratorId: { type: 'number' },
        groupId: { type: 'number'}
      },
    },
  })
  async updateGroup(
  @Param('id') id: string,
  @Body() body: UpdateStudentDto
 ) {
  return this.studentService.updateStudent(+id, body);
 }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}