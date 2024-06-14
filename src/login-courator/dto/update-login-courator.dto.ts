import { PartialType } from '@nestjs/swagger';
import { CreateLoginCouratorDto } from './create-login-courator.dto';

export class UpdateLoginCouratorDto extends PartialType(CreateLoginCouratorDto) {}
