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


@NgModule({
  declarations: [HeaderComponent, HomeComponent, SidenavComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
