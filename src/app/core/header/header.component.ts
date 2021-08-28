import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  isExpanded = false;

  constructor() {}

  ngOnInit() {}

  open(){
    this.isExpanded = !this.isExpanded;
    this.change.emit(this.isExpanded);
  }
}
