import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, 
    MatFormFieldModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule,
      MatInputModule
    ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule,
    MatInputModule
],
})
export class MyOwnCustomMaterialModule { }