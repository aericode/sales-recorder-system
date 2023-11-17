import * as rawbody from 'raw-body';
import { Body, Req } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async postFile(@Body() data, @Req() req){
    if (req.readable) {
      const raw = await rawbody(req);
      const text = raw.toString().trim();
      const json = JSON.parse(text)
      console.log(json);

      return "success"
    }else{
      return "error"
    }
  }
}
