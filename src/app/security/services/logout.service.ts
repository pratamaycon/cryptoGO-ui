import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  public tokenRevokeUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenRevokeUrl = `${environment.apiURL}/tokens/revoke`;
  }

  logout() {
    return of(
      pipe(
        map((_) => {
          this.authService.limparAccessToken()
        })
      ));
  }
}
