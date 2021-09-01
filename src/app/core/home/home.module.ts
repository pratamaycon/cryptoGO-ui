import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HomeRoutingModule } from './home.routing';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AlterarSenhaComponent } from '../alterar-senha/alterar-senha.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, SidenavComponent, FooterComponent, UserProfileComponent, AlterarSenhaComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    HomeRoutingModule
  ],
  entryComponents: [
    UserProfileComponent,
    AlterarSenhaComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
