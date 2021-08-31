import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../crypto/usuarios/services/usuario.service';

export interface DialogData {
  showCadastro: boolean;
}

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  public loginForm!: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  cadastrar() {
    const { nome, sobrenome, login, senha, email } = this.loginForm.controls
    this.usuarioService.
    adicionar(
      new Usuario(nome.value, sobrenome.value, login.value, senha.value, email.value)
    ).subscribe((_) => {
      this.router.navigate(['/dashboard']);
    })
  }

}
