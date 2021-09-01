import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Usuario } from '../../../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuarioUrl: string;
  private authSubject$ = new BehaviorSubject<Usuario>({} as any);

  constructor(private http: HttpClient) {
    this.usuarioUrl = `${environment.apiURL}/api/v1/users`;
  }

  signOut(usuario: Usuario): void {
    this.authSubject$.next(usuario);
  }

  isAuth$(): Observable<Usuario> {
    return this.authSubject$.asObservable();
  }

  adicionar(usuario: Usuario): Observable<Usuario> {
    const headers = this.getHeaders();

    const body: any = {
      "codigo": usuario.codigo,
      "nome": usuario.nome,
      "sobrenome": usuario.sobrenome,
      "login": usuario.login,
      "senha": usuario.senha,
      "email": usuario.email
    }

    return this.http.post(this.usuarioUrl, body, { headers }).pipe(
      map((user: Usuario) => {
        return user;
      }, take(1))
    );
  }

  usuarioPorId(username: string) {
    const headers = this.getHeaders();

    return this.http.get(`${this.usuarioUrl}/${username}`, { headers }).pipe(
      map((user: Usuario) => {
        return user;
      }, take(1))
    );
  }

  alterarSenha(codigo: number | undefined, senhaAtual: string, novaSenha: string) {
    const headers = this.getHeaders();

    const body: any = {
      "senhaAtual": senhaAtual,
      "novaSenha": novaSenha
    }

    return this.http.put(`${this.usuarioUrl}/${codigo}/senha`, body, { headers }).pipe(
      map((user: any) => {
        return user;
      }, take(1))
    );
  }

  atualizar(usuario: Usuario): Observable<any> {
    const headers = this.getHeaders();

    const body: any = {
      "codigo": usuario.codigo,
      "nome": usuario.nome,
      "sobrenome": usuario.sobrenome,
      "login": usuario.login,
      "senha": usuario.senha,
      "email": usuario.email
    }

    return this.http
      .put(`${this.usuarioUrl}/${usuario.login}`, body, { headers })
      .pipe(
        map((user: any) => {
          return user;
        }, take(1))
      );
  }

  excluir(login: string): Observable<any> {
    return this.http
      .delete(`${this.usuarioUrl}/${login}`)
      .pipe(take(1));
  }

  listarTodas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.usuarioUrl, { headers }).pipe(take(1));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json, */*')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}

