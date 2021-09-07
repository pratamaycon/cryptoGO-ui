import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from '../crypto/usuarios/cadastro-usuario/cadastro-usuario.component';
import { ErroComponent } from '../core/erro/erro.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: '**', component: ErroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }
