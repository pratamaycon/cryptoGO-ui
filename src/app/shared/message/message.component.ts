import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input() public error!: string;
  @Input() public control!: AbstractControl;
  @Input() public text!: string;

  @Input() public controlCustom!: string;
  @Input() public textCustom!: string;

  constructor() { }

  ngOnChanges() {
    console.log(this.controlCustom, this.textCustom);
  }

  getErrorMessage() {

    return this.control.hasError(this.error) ? this.text :
    this.control.hasError(this.controlCustom) ? this.textCustom :
      '';
  }

  checaErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
