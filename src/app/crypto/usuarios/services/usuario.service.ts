import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Usuario } from '../../../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuarioUrl: string;

  constructor(private http: HttpClient) {
    this.usuarioUrl = `${environment.apiURL}/api/v1/users`;
  }

  adicionar(usuario: Usuario): Observable<Usuario> {
    const headers = this.getHeaders();

    const body = JSON.stringify(usuario);

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

  listarTodas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.usuarioUrl, { headers }).pipe(take(1));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}

