import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, share } from 'rxjs/operators';

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

  obterNovoAccessToken(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic Y3J5cHRvOmNycHQwRzA=');

    const body = 'grant_type=refresh_token';

    return this.http
      .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .pipe(
        map((res: any) => {
          this.armazenarToken(res.access_token);
          console.log('Novo Acess Token Criado');
          return res;
        }),
        catchError(this.handleError)
      );
  }

  obterNovoAccessTokenObservable(): Observable<string> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y3J5cHRvOmNycHQwRzA=');

    const body = `grant_type=refresh_token`;

    return this.http
      .post(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true })
      .pipe(
        share(),
        catchError(this.handleError),
        map((resp) => {
          this.armazenarToken(resp.access_token);
          return resp.access_token;
        })
      );
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
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

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
