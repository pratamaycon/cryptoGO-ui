import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

import { UsuarioRoutingModule } from './usuario.routing';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosComponent } from './usuarios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosComponent, CadastroUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
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
  ]
})
export class UsuariosModule { }
