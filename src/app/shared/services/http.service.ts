import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "environments/environment";

@Injectable()
export class HttpService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getMenuData(): Observable<any> {
    return this.http.get(
      this.baseUrl +
        "/getMenu/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=1"
    );
  }

  public getRevData(): Observable<any> {
    return this.http.get(
      "https://api.ipos.bg/ang5/itemsGet2/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111"
    );
    //.map(response => response.text());
  }
}
