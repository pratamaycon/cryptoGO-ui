import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [HeaderComponent, HomeComponent, SidenavComponent, FooterComponent, UserProfileComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule
  ],
  entryComponents: [
    UserProfileComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
