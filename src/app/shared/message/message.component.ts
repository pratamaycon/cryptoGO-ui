import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() public error: string = '';
  @Input() public control!: AbstractControl;
  @Input() public text: string = '';

  constructor() { }

  getErrorMessage() {
    return this.control.hasError(this.error) ? this.text : '';
  }

  checaErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
