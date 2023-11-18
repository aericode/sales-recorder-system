import * as rawbody from 'raw-body';
import { HttpException, HttpStatus, Req } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { TransactionEntryDto } from './dtos/TransactionEntry.dto';
import { EntryError } from './types/EntryError';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async handleFilePost(@Req() req){
    const transactionEntries: TransactionEntryDto[] = await this.receiveData(req)
    const errorArray:EntryError[] = this.validateEntries(transactionEntries)
    if(errorArray.length === 0){
      console.log('no errors')
    }else{
      console.log(this.generateEntryErrorMessage(errorArray))
    }
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
    const errorArray = <EntryError[]>[]
    let currentTransactionIndex = 0
    transactionEntries.forEach((entry) => {
      const entryErrorArray = <string[]>[]
      
      if(!verifyType(entry.type))entryErrorArray.push("tipo")
      if(!verifyDate(entry.date))entryErrorArray.push("data")
      if(!verifyProduct(entry.product))entryErrorArray.push("produto")
      if(!verifyValue(entry.value))entryErrorArray.push("valor")
      if(!verifyVendor(entry.vendor))entryErrorArray.push("vendedor")

      if(entryErrorArray.length !== 0){
        const newEntry: EntryError = { index: currentTransactionIndex, errors: entryErrorArray };
        errorArray.push(newEntry);
      }

      currentTransactionIndex++;
    })

    function verifyType(entryType : string){
      let isValid = true
      const parsed = parseInt(entryType)

      if(entryType.length !=  1) isValid = false;
      if(isNaN(parsed)){
        isValid = false
      }else{
        if(parsed == 0 || parsed > 4) isValid = false;
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


    return errorArray
  }

  generateEntryErrorMessage(errorArray : EntryError[]){
    const introduction = `Opa! Encontramos um erro no arquivo enviado`
    const lineMessageArray = <string[]>[];
    errorArray.forEach(errorEntry =>{
      const errorIndex:number = errorEntry.index

      const entryErrorArray:string[] = errorEntry.errors
      const isMessageOnPlural = entryErrorArray.length === 1

      const stringfiedErrorList: string = entryErrorArray.join(', ');

      //The key is indexed to zero, whereas the line is indexed to 1
      //adding 1 corrects the indexing for the user
      const lineMessage =
      `Na linha ${errorIndex + 1} ${isMessageOnPlural ? `foram encontrados erros nos campo:` : `foi encontrado um erro no campo:`} ${stringfiedErrorList}.`
      lineMessageArray.push(lineMessage)
    })
    const lineMessageString = lineMessageArray.join('\n')
    const errorMessage = `${introduction}\n${lineMessageString}`

    return errorMessage
  }
  
}
