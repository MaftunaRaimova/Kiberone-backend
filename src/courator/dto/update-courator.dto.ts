import { PartialType } from '@nestjs/swagger';
import { CreateCouratorDto } from './create-courator.dto';

export class UpdateCouratorDto extends PartialType(CreateCouratorDto) {}
