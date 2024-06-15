import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouratorService } from './courator.service';
import { CreateCouratorDto } from './dto/create-courator.dto';
import { UpdateCouratorDto } from './dto/update-courator.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Courator')
@Controller('courator')
export class CouratorController {
  constructor(private readonly couratorService: CouratorService) {}

  @ApiOperation({ summary: 'Create new courator' })
  @ApiBody({ type: CreateCouratorDto })
  @Post()
  async addCourator(@Body() body: CreateCouratorDto) {
    return this.couratorService.create(body);
  }

  @ApiOperation({ summary: 'Get all courators' })
  @Get()
  async findAll() {
    return this.couratorService.findAllCourator();
  }

  @ApiOperation({ summary: 'Get courator by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couratorService.findCouratorById(+id);
  }

  @ApiOperation({ summary: 'Update courator by ID' })
  @ApiBody({ type: UpdateCouratorDto })
  @Patch(':id')
  async updateCourator(@Param('id') id: string, @Body() body: UpdateCouratorDto) {
    return this.couratorService.updateCourator(+id, body);
  }

  @ApiOperation({ summary: 'Delete courator by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couratorService.remove(+id);
  }
}
