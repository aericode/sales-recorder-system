import * as rawbody from 'raw-body';
import { HttpException, HttpStatus, Req } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async handleFilePost(@Req() req){
    const jsonInput:JSON[] = await this.receiveData(req)
    console.log(jsonInput)
  }

  async receiveData(@Req() req){
    if (req.readable) {
      const rawInput = await rawbody(req);
      const textInput = rawInput.toString().trim();
      const jsonInput = JSON.parse(textInput)
      return jsonInput as JSON[]
    }else{
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
  }

  validateData (jsonInput :JSON[]){
    //jsonInput
  }
}
