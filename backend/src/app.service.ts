import * as rawbody from 'raw-body';
import { HttpException, HttpStatus, Req } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { TransactionEntryDto } from './dtos/TransactionEntry.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async handleFilePost(@Req() req){
    const transactionEntries: TransactionEntryDto[] = await this.receiveData(req)
    //console.log(transactionEntries)
    //console.log('teste', Array.isArray(transactionEntries))

    console.log(this.validateEntries(transactionEntries))
  }

  async receiveData(@Req() req){
    if (req.readable) {
      const rawInput = await rawbody(req)
      const textInput = rawInput.toString().trim()
      const jsonInput = JSON.parse(textInput)
      const transactionEntries : TransactionEntryDto[] = jsonInput.data
      return transactionEntries
    }else{
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
  }

  validateEntries (transactionEntries: TransactionEntryDto[]){
    const irregularEntryIndexList = <Number[]>[]
    let currentTransactionIndex = 0
    transactionEntries.forEach((entry) => {
      if(!validateFieldSizes(entry)) irregularEntryIndexList.push(currentTransactionIndex)
      currentTransactionIndex++;
    });


    function validateFieldSizes(entry : TransactionEntryDto){
      let isValid = true
      if(entry.type.length !=  1) isValid = false;
      if(entry.date.length != 25) isValid = false;
      if(entry.product.length != 30) isValid = false;
      if(entry.value.length != 10) isValid = false;
      if(entry.vendor.length > 20) isValid = false;
      
      console.log(entry, entry.type.length, entry.date.length, entry.product.length, entry.value.length, entry.vendor.length)
      return isValid;
    }

    function verifyType(entryType : string){
      let isValid = true
      const parsed = parseInt(entryType)

      if(entryType.length !=  1) isValid = false;
      if(isNaN(parsed)){
        isValid = false
      }else{
        if(parsed < 1 || parsed > 4) isValid = false;
      }

      return isValid
    }

    function verifyDate(entryDate : string){
      let isValid = true
      const parsed = Date.parse(entryDate);

      if(entryDate.length !=  25) isValid = false;
      if(isNaN(parsed)) isValid = false

      return isValid
    }


    function verifyProduct(entryProduct : string){
      let isValid = true
      if(entryProduct.length !=  30) isValid = false;

      return isValid
    }

    function verifyValue(entryValue : string){
      let isValid = true
      const parsed = parseInt(entryValue)

      if(entryValue.length !=  10) isValid = false;
      if(isNaN(parsed)) isValid = false

      return isValid
    }

    function verifyVendor(entryVendor : string){
      let isValid = true
      if(entryVendor.length ==  0 || entryVendor.length > 20 ) isValid = false;

      return isValid
    }


    return irregularEntryIndexList
  }

  
}
