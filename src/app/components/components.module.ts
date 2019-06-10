import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dateFormatPipe } from './filter-pipe/filter-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    dateFormatPipe
  ],
  exports:[
    dateFormatPipe
]
  
})
export class ComponentsModule { }
