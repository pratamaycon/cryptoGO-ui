import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes('/oauth/token')) {
      return next.handle(request).pipe(
        catchError((erro: any) => {
          if (
            erro.status === 401 &&
            erro.error.error_description.includes(
              'Invalid refresh token (expired)'
            )
          ) {
            this.router.navigate(['/login']);
          } else if (
            erro.status === 401 &&
            erro.error.error_description.includes(
              'Cannot convert access token to JSON'
            )
          ) {
            this.router.navigate(['/login']);
          }

          return throwError(erro);
        })
      );
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error.status === 401 &&
          error.error.error_description.includes('Access token expired')
        ) {
          return this.authService.obterNovoAccessTokenObservable().pipe(
            mergeMap((newToken: string) => {
              console.log('Novo access_token');
              request = this.addToken(request, newToken);
              return next.handle(request);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    let headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return request.clone({ headers });
  }
}
