import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { JwtHelperService } from '@auth0/angular-jwt';

import { UsuarioService } from '../../crypto/usuarios/services/usuario.service';
import { JWTDeCode } from './../../shared/models/jwt-decode-model';
import { AuthService } from './../../security/services/auth.service';
import { Usuario } from './../../models/usuario';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  public username: string = '';
  public codigo: number | undefined = 0;

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private jwtHelperService: JwtHelperService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    const token: JWTDeCode = this.jwtHelperService.decodeToken(this.auth.getToken());
    this.username = token.user_name;
    this.loginForm = this.fb.group({
      pwCurrent: ['', Validators.required],
      pwNew: ['', Validators.required]
    });

    setTimeout(() => {
      this.usuarioService.usuarioPorId(this.username)
      .subscribe((user: Usuario) => {
        this.codigo = user.codigo;
      });
    });
  }

  salvar(){
    const { pwCurrent, pwNew } = this.loginForm.controls
    this.usuarioService.alterarSenha(this.codigo, pwCurrent.value, pwNew.value).subscribe(_ => {})
  }
}
