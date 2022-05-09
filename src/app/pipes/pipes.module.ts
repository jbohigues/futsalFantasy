import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThousandsPipe } from './misPipes/thousands.pipe';

@NgModule({
  declarations: [ThousandsPipe],
  imports: [CommonModule],
  exports: [ThousandsPipe],
})
export class PipesModule {}
