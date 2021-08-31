import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../services/usuario.service';

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
      email: ['', Validators.required, Validators.email, this.availableEmail]
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

  availableEmail() {
    return (control: AbstractControl) => {
      return control.valueChanges?.pipe(
        map((emailExiste) =>
          emailExiste ? emailExiste  : null
        ),
      );
    };
  }
}
