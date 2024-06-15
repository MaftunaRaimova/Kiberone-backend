import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Parent')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post()
  create(@Body() body: CreateParentDto) {
    return this.parentService.create(body);
  }

  @Get()
  findAll() {
    return this.parentService.findAllParent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentService.findParentById(+id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateParentDto) {
    return this.parentService.updateParent(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.removeParent(+id);
  }
}
