import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageComponent } from './message/message.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [LoaderComponent, MessageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoaderComponent, MessageComponent]
})
export class SharedModule { }
