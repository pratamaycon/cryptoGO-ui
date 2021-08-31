import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { UsuarioRoutingModule } from './usuario.routing';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosComponent } from './usuarios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    RouterModule
  ]
})
export class UsuariosModule { }
