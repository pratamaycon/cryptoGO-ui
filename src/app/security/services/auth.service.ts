import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public oauthTokenUrl: string;
  public jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.oauthTokenUrl = `${environment.apiURL}/oauth/token`;
    this.carregarToken();
  }

  autenticacao(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic Y3J5cHRvOmNycHQwRzA=');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http
      .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .pipe(
        map((res: any) => {
          this.armazenarToken(res.access_token);
        }),
        catchError(this.handleError)
      );
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 400) {
      if (error.error.error === 'invalid_grant') {
        return throwError('Usuário ou senha inválida');
      }
    }

    return throwError(error);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }
}
