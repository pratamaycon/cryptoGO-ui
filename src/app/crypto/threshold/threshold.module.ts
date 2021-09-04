import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { ThresholdComponent } from './threshold.component';
import { ThresholdRoutingModule } from './threshold.routing';
import { CadastroThresholdComponent } from './cadastro-threshold/cadastro-threshold.component';

@NgModule({
  imports: [
    CommonModule,
    ThresholdRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    SharedModule,
    RouterModule
  ],
  declarations: [ThresholdComponent, CadastroThresholdComponent]
})
export class ThresholdModule { }
