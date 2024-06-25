import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request) {
    // console.log(request.cookies);
    console.log(request.cookies.test);
    // @Headers('cookie') cookie: string,
    return this.appService.getHello();
  }
}
