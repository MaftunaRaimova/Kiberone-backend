import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouratorService } from './courator.service';
import { CreateCouratorDto } from './dto/create-courator.dto';
import { UpdateCouratorDto } from './dto/update-courator.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courator')
@Controller('courator')
export class CouratorController {
  constructor(private readonly couratorService: CouratorService) {}

  @Post()
  create(@Body() createCouratorDto: CreateCouratorDto) {
    return this.couratorService.create(createCouratorDto);
  }

  @Get()
  findAll() {
    return this.couratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouratorDto: UpdateCouratorDto) {
    return this.couratorService.update(+id, updateCouratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couratorService.remove(+id);
  }
}
