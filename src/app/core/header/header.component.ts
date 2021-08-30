import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  isExpanded = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  open(){
    this.isExpanded = !this.isExpanded;
    this.change.emit(this.isExpanded);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserProfileComponent);

    dialogRef.afterClosed().subscribe(_ => {
    });
  }
}
