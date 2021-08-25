import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () => import(`./security/security.module`).then(
      module => module.SecurityModule
    )
  },

  { path: '' , redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
