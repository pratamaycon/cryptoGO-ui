import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

import { CryptoTipos } from '../../../models/cryptoTipos';
import { environment } from './../../../../environments/environment';
import { CryptoThresholds } from '../../../models/cryptoThresholds';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {

  public cryptoUrl: string;
  private authSubject$ = new BehaviorSubject<CryptoTipos>({} as any);

  constructor(private http: HttpClient) {
    this.cryptoUrl = `${environment.apiURL}/api/v1/cryptos`;
  }

  signOut(cryptos: CryptoTipos): void {
    this.authSubject$.next(cryptos);
  }

  isAuth$(): Observable<CryptoTipos> {
    return this.authSubject$.asObservable();
  }

  listarPaginadas(params: any): Observable<any> {
    const {page, size} = params ? params: 0;
    const headers = this.getHeaders();
    return this.http.get(`${this.cryptoUrl}?page=${page ? page : 0}&size=${size ? size: 5}`, { headers }).pipe(take(1));
  }

  cryptosPorNome(nome: string | undefined): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(`${this.cryptoUrl}/${nome}`, { headers }).pipe(
      map((crypto: CryptoThresholds) => {
        return crypto;
      }, take(1))
    );
  }

  adicionar(cryptos: CryptoTipos): Observable<any> {
    const headers = this.getHeaders();

    const body: any = {
      "nome": cryptos.nome,
      "criptoTransactions": cryptos.criptoTransactions
    }

    return this.http.post(this.cryptoUrl, body, { headers }).pipe(
      map((crypto: any) => {
        return crypto;
      }, take(1))
    );
  }

  atualizar(codigo: number | undefined, cryptos: CryptoTipos): Observable<CryptoTipos> {
    const headers = this.getHeaders();

    const body: any = {
      "nome": cryptos.nome,
      "criptoTransactions": cryptos.criptoTransactions
    }

    return this.http.put(`${this.cryptoUrl}/${codigo}`, body, { headers }).pipe(
      map((crypto: any) => {
        return crypto;
      }, take(1))
    );
  }

  excluir(codigo: number): Observable<any> {
    return this.http
      .delete(`${this.cryptoUrl}/${codigo}`)
      .pipe(take(1));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json, */*')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
