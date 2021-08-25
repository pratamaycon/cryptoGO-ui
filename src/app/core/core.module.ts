import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { SecurityModule } from '../security/security.module';
import { AuthService } from '../security/services/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SecurityModule
  ],
  exports: [],
  providers: [
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
})
export class CoreModule {}
