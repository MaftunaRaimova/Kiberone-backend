import { PartialType } from '@nestjs/swagger';
import { CreateKiberoneDto } from './create-kiberone.dto';

export class UpdateKiberoneDto extends PartialType(CreateKiberoneDto) {}
