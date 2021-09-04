import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { JWTDeCode } from './../../shared/models/jwt-decode-model';
import { LogoutService } from './../../security/services/logout.service';
import { AuthService } from './../../security/services/auth.service';
import { UsuarioService } from '../../crypto/usuarios/services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AlterarSenhaComponent } from '../alterar-senha/alterar-senha.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public username: string = '';
  public usuario!: Usuario;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private matDialog: MatDialog,
    private usuarioService: UsuarioService,
    private jwtHelperService: JwtHelperService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.usuarioService.usuarioPorLogin(this.username)
      .subscribe((user: Usuario) => {
        this.usuario = user;
      });
    });
  }

  ngOnInit() {
    const token: JWTDeCode = this.jwtHelperService.decodeToken(this.auth.getToken());
    this.username = token.user_name;
  }

  logout() {
    this.logoutService.logout().subscribe((_) => {
      this.matDialog.closeAll();
      this.router.navigate(['/login'])
    },
    ((erro: any) => console.log(erro))
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(AlterarSenhaComponent);

    dialogRef.afterClosed().subscribe(_ => {});
  }

}
