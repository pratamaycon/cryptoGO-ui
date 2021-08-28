import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
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
