import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

  }

  onSubmit() {}

}
