import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Animations } from './animation/sidenav-animation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [ Animations.animeTrigger]
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  @Input() isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor() { }

  ngOnInit() {}

}
