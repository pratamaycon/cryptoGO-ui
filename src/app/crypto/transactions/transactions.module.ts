import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions.routing';


@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ],
  declarations: [TransactionsComponent]
})
export class TransactionsModule { }
