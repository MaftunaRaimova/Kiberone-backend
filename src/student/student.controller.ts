import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { StudentServiceAdmin } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Student', 'Admin')
@Controller('student')
export class StudentControllerAdmin {
  constructor(private readonly studentServiceAdmin: StudentServiceAdmin) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        login: { type: 'string' },
        password: { type: 'string' },
        isActive: { type: 'boolean' },
        couratorId: { type: 'number' },
        groupId: { type: 'number'},
        parentId: { type: 'number'}
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
    return this.studentServiceAdmin.create(body);
  }

  @Get()
  findAll() {
    return this.studentServiceAdmin.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentServiceAdmin.findStudentById(+id);
  }

  
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        login: { type: 'string' },
        password: { type: 'string' },
        isActive: { type: 'boolean' },
        couratorId: { type: 'number' },
        groupId: { type: 'number'},
        parentId: { type: 'number'}
      },
    },
  })
  @Patch(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentDto,
  ) {
    return this.studentServiceAdmin.updateStudent(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentServiceAdmin.remove(+id);
  }
}

// @ApiTags('Student')
// @Controller('student')
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   @Get()
//   findAll() {
//     return this.studentService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.studentService.findStudentById(+id);
//   }
// }