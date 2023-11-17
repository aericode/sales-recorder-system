import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postFile(@Req() req){
    return this.appService.handleFilePost(req);
  }

}
