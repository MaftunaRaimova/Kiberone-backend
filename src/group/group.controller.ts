import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupService, GroupServiceAdmin } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findGroupById(+id);
  }

}

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Group', 'Admin')
@Controller('group')
export class GroupControllerAdmin{
  constructor(private readonly groupServiceAdmin: GroupServiceAdmin) {}

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
    return this.groupServiceAdmin.create(body);
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
  return this.groupServiceAdmin.updateGroup(+id, body);
 }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupServiceAdmin.remove(+id);
  }
}
