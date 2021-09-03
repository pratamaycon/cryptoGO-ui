import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from '../crypto/usuarios/cadastro-usuario/cadastro-usuario.component';
import { SecurityRoutingModule } from './security.routing';
import { AuthGuard } from './guard/auth.guard';
import { LogoutService } from './services/logout.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SecurityRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [AuthGuard, LogoutService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class SecurityModule { }
