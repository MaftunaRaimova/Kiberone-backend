import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        couratorId: { type: 'number' },
      },
    },
  })

  @Post()
    async addStudent(
      @Body()
      body: CreateGroupDto,

    )
  {
    return this.groupService.create(body);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findGroupById(+id);
  }

  @Patch(':id') 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        couratorId: { type: 'number' },
      },
    },
  })
  async updateGroup(
  @Param('id') id: string,
  @Body() body: UpdateGroupDto
 ) {
  return this.groupService.updateGroup(+id, body);
 }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
