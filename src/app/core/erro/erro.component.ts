import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss']
})
export class ErroComponent implements OnInit {

  url = '../../../assets/img/404-error.gif';

  constructor() { }

  ngOnInit() {
  }

}
