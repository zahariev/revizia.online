import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getMenuData(): Observable<any> {
    return this.http.get(
      // "https://api.ipos.bg/ang5/menuGet/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111" http://localhost/api/getMenu
      "http://localhost/api/getMenu/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=1"
    );
  }

  public getRevData(): Observable<any> {
    return this.http.get(
      "https://api.ipos.bg/ang5/itemsGet2/?ApiKey=c7a919e51f2268e5c8eb471ae093d15d&areaID=111"
    );
    //.map(response => response.text());
  }
}
