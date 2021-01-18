import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  private proxy: string = 'https://cors-anywhere.herokuapp.com/';
  private url: string = 'https://api.deezer.com/'

  constructor(private http: HttpClient) { }

  getCharts(): Observable<any>{
    return this.http.get<any>(this.proxy + this.url + 'chart/0');
  }

  getTrack(id: number): Observable<any>{
    return this.http.get<any>(this.proxy + this.url + 'track/' + id);
  }

}
