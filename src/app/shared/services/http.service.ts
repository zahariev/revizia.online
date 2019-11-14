import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {environment} from 'environments/environment';

@Injectable()
export class HttpService {
  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ApiKey: 'c7a919e51f2268e5c8eb471ae093d15d'
    })
  };

  constructor(private http: HttpClient) {
  }

  private get(url: string, data: string): Observable<any> {
    return this.http.post(this.baseUrl + url, data, this.httpOptions);
  }

  private set(url: string, data: string): Observable<any> {
    return this.http.put(this.baseUrl + url, data, this.httpOptions);
  }

  public getRevData(): Observable<any> {
    return this.get(
      '/getRevData/',
      'ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=1'
    );
  }

  public setRevData(data): Observable<any> {
    return this.set('/setRevData/', data);
  }

  public getRevData2(): Observable<any> {
    return this.http.get(
      '/itemsGet2/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111'
    );
    //.map(response => response.text());
  }
}
