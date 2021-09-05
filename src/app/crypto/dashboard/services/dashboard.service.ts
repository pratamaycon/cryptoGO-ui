import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private http: HttpClient) {}

  listarTodas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`, { headers }).pipe(take(1));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json, */*')
      .set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

}
