import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LimitsService } from './limits.service';
import { CreateLimitDto } from './dto/create-limit.dto';
import { UpdateLimitDto } from './dto/update-limit.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Limits')
@Controller('limits')
export class LimitsController {
  constructor(private readonly limitsService: LimitsService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reason: { type: 'string' },
        limits: { type: 'array', items: { type: 'number' } },
      },
    },
  
  })
  @Post()
  create(@Body() body: CreateLimitDto) {
    return this.limitsService.create(body);
  }

  @Get()
  findAll() {
    return this.limitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.limitsService.findOne(+id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id : { type: 'number' },
        reason: { type: 'string' },
        limits: { type: 'array', items: { type: 'number' } },
      },
    },
  
  })
  @Patch(':id')
  update(@Body() body: UpdateLimitDto) {
    return this.limitsService.update(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.limitsService.remove(+id);
  }
}
