import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { CryptoThresholds } from '../../../models/cryptoThresholds';

@Injectable({
  providedIn: 'root'
})
export class CryptoThresholdsService {

  public cryptoThresholdsUrl: string;
  private authSubject$ = new BehaviorSubject<CryptoThresholds>({} as any);

  constructor(private http: HttpClient) {
    this.cryptoThresholdsUrl = `${environment.apiURL}/api/v1/cryptosThresholds`;
  }

  signOut(cryptosThresholds: CryptoThresholds): void {
    this.authSubject$.next(cryptosThresholds);
  }

  isAuth$(): Observable<CryptoThresholds> {
    return this.authSubject$.asObservable();
  }

  listarTodas(params: any): Observable<any> {
    const {page, size} = params ? params: 0;
    const headers = this.getHeaders();
    return this.http.get(`${this.cryptoThresholdsUrl}?page=${page ? page : 0}&size=${size ? size: 5}`, { headers }).pipe(take(1));
  }

  adicionar(cryptosThresholds: CryptoThresholds): Observable<any> {
    const headers = this.getHeaders();

    const body: any = {
      "threshold_minimo": cryptosThresholds.threshold_minimo,
      "threshold_maximo": cryptosThresholds.threshold_maximo,
      "data_atualizacao": cryptosThresholds.data_atualizacao,
      "usuario": cryptosThresholds.usuario,
      "criptoTipos": cryptosThresholds.criptoTipos
    }

    return this.http.post(this.cryptoThresholdsUrl, body, { headers }).pipe(
      map((cryptosThresholds: CryptoThresholds) => {
        return cryptosThresholds;
      }, take(1))
    );
  }

  atualizar(codigo: number | undefined, cryptosThresholds: CryptoThresholds): Observable<CryptoThresholds> {
    const headers = this.getHeaders();

    const body: any = {
      "threshold_minimo": cryptosThresholds.threshold_minimo,
      "threshold_maximo": cryptosThresholds.threshold_maximo,
      "data_atualizacao": cryptosThresholds.data_atualizacao,
      "usuario": cryptosThresholds.usuario,
      "criptoTipos": cryptosThresholds.criptoTipos
    }

    return this.http
      .put(`${this.cryptoThresholdsUrl}/${codigo}`, body, { headers })
      .pipe(
        map((cryptosThresholds: CryptoThresholds) => {
          return cryptosThresholds;
        }, take(1))
      );
  }

  excluir(codigo: number): Observable<any> {
    return this.http
      .delete(`${this.cryptoThresholdsUrl}/${codigo}`)
      .pipe(take(1));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json, */*')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
