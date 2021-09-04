import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/security/guard/auth.guard';
import { ThresholdComponent } from './threshold.component';

const routes: Routes = [
  {
    path: '',
    component: ThresholdComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: ':codigo',
    component: ThresholdComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThresholdRoutingModule { }
