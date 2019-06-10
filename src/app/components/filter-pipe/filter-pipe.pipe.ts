

import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
    name: 'dateFormatPipe',
})
// tslint:disable-next-line:class-name
export class dateFormatPipe implements PipeTransform {
    transform(value: string) {
       const datePipe = new DatePipe('en-US');
       value = datePipe.transform(value, 'yyyy-MM-dd');
       return value;
    }
}