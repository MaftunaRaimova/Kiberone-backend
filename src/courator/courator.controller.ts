import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouratorService } from './courator.service';
import { CreateCouratorDto } from './dto/create-courator.dto';
import { UpdateCouratorDto } from './dto/update-courator.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Courator')
@Controller('courator')
export class CouratorController {
  constructor(private readonly couratorService: CouratorService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  })
  @Post()
    async addCourator(
      @Body()
      body: CreateCouratorDto,

    )
  {
    return this.couratorService.create(body);
  }

  @Get()
  async findAll() {
    return this.couratorService.findAllCourator();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couratorService.findCouratorById(+id);
  }
  @Patch(':id') 
  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
  },
 })
 async updateCourator(
  @Param('id') id: string,
  @Body() body: UpdateCouratorDto
 ) {
  return this.couratorService.updateCourator(+id, body);
 }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couratorService.remove(+id);
  }
}
