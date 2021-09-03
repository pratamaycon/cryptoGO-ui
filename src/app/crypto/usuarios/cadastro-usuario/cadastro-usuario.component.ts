import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { animate } from '@angular/animations';

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

  usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastyService: ToastyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.usuarioService.isAuth$().subscribe((user: Usuario) => {
      this.usuario = user;
    })
    const { nome, sobrenome, login, senha, email} = this.usuario
    this.loginForm = this.fb.group({
      nome: new FormControl(nome, [Validators.required]),
      sobrenome: new FormControl(sobrenome, [Validators.required]),
      login: new FormControl(login, [Validators.required]),
      senha: new FormControl(senha, [Validators.required]),
      email: new FormControl(email, [Validators.required])
    });
  }

  cadastrar() {
    if(!this.data.showCadastro) {
      const { nome, sobrenome, login, senha, email } = this.loginForm.controls
      this.usuarioService.
      adicionar(
        new Usuario(nome.value, sobrenome.value, login.value, senha.value, email.value)
      ).subscribe((_) => {
        this.toastyService.success({
          title: 'Adicionado',
          timeout: 5000,
          msg: 'Usuário adicionado com sucesso!',
          showClose: true,
        });
        this.router.navigate(['/usuarios']);
      },
      (_) => {
        this.toastyService.error({
          title: 'Erro',
          timeout: 5000,
          msg: 'Usuário não adicionado',
          showClose: true,
        });
      }
      );
    } else {
        this.usuarioService.atualizar(this.loginForm.value)
            .subscribe((user: Usuario) => {
              this.toastyService.success({
                title: 'Atualizado',
                timeout: 5000,
                msg: 'Usuário atualizado com sucesso!',
                showClose: true,
              });
            },
        (_) => {
          this.toastyService.error({
            title: 'Erro',
            timeout: 5000,
            msg: 'Usuário não adicionado',
            showClose: true,
          });
        }
        );
    }
  }
}
