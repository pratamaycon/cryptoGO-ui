import { JwtHelperService } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CadastroUsuarioComponent } from '../crypto/usuarios/cadastro-usuario/cadastro-usuario.component';
import { SecurityRoutingModule } from './security.routing';
import { AuthGuard } from './guard/auth.guard';
import { LogoutService } from './services/logout.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SecurityRoutingModule
  ],
  exports: [
    LoginComponent,
    CadastroUsuarioComponent
  ],
  providers: [AuthGuard, LogoutService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class SecurityModule { }
