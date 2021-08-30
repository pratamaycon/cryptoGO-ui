import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import(`./crypto/dashboard/dashboard.module`).then(
      module => module.DashboardModule
    )
  },
  {
    path: 'usuarios',
    loadChildren: () => import(`./crypto/usuarios/usuarios.module`).then(
      module => module.UsuariosModule
    )
  },

  { path: '' , redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
