import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThresholdComponent } from './threshold.component';
import { ThresholdRoutingModule } from './threshold.routing';

@NgModule({
  imports: [
    CommonModule,
    ThresholdRoutingModule
  ],
  declarations: [ThresholdComponent]
})
export class ThresholdModule { }
