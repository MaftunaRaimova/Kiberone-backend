import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginCouratorService } from './login-courator.service';
import { CreateLoginCouratorDto } from './dto/create-login-courator.dto';
import { UpdateLoginCouratorDto } from './dto/update-login-courator.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('LoginCourator')
@Controller('login-courator')
export class LoginCouratorController {
  constructor(private readonly loginCouratorService: LoginCouratorService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post()
  async create(@Body() body: CreateLoginCouratorDto) {
    return this.loginCouratorService.search(body);
  }
}