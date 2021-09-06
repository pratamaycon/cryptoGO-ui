import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = false;

  selectValue: string = '';
  maximum!: number;
  minimum!: number;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  firstForm(form: FormGroup) {
    this.firstFormGroup = form;
    this.isLinear = true;
  }

  selectedValue(value: string) {
    this.selectValue = value;
  }

  minMax(event: any) {
    this.maximum = event.max;
    this.minimum = event.min;
  }

}
