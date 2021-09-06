import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { RankingCryptosComponent } from './pages/ranking-cryptos/ranking-cryptos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ConfigurarCryptosComponent } from './pages/configurar-cryptos/configurar-cryptos.component';

@NgModule({
  declarations: [DashboardComponent, RankingCryptosComponent, ConfigurarCryptosComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatStepperModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
