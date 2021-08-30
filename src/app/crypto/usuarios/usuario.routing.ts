import { AuthGuard } from './../../security/guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
