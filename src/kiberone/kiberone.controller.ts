import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KiberoneService } from './kiberone.service';
import { CreateKiberoneDto } from './dto/create-kiberone.dto';
import { UpdateKiberoneDto } from './dto/update-kiberone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Kiberone')
@Controller('kiberone')
export class KiberoneController {
  constructor(private readonly kiberoneService: KiberoneService) {}

  @Post()
  create(@Body() createKiberoneDto: CreateKiberoneDto) {
    return this.kiberoneService.create(createKiberoneDto);
  }

  @Get()
  findAll() {
    return this.kiberoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kiberoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKiberoneDto: UpdateKiberoneDto) {
    return this.kiberoneService.update(+id, updateKiberoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kiberoneService.remove(+id);
  }
}
