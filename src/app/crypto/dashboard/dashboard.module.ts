import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { RankingCryptosComponent } from './pages/ranking-cryptos/ranking-cryptos.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent, RankingCryptosComponent  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatStepperModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
