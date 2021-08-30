import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from './../../security/guard/auth.guard';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import(`../../crypto/dashboard/dashboard.module`).then(
          module => module.DashboardModule
        )
      },
      {
        path: 'usuarios',
        loadChildren: () => import(`../../crypto/usuarios/usuarios.module`).then(
          module => module.UsuariosModule
        )
      },
      {
        path: 'transactions',
        loadChildren: () => import(`../../crypto/transactions/transactions.module`).then(
          module => module.TransactionsModule
        )
      },
      {
        path: 'threshold',
        loadChildren: () => import(`../../crypto/threshold/threshold.module`).then(
          module => module.ThresholdModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
