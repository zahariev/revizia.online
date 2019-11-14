import {Injectable} from '@angular/core';

import {HttpService} from './http.service';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {
  private tabsSource = new BehaviorSubject([]);
  tabs = this.tabsSource.asObservable();

  private menuSource = new BehaviorSubject([]);
  menu = this.menuSource.asObservable();

  // private usersSource = new BehaviorSubject(new Array());
  // users = this.usersSource.asObservable();

  constructor(private http: HttpService) {
    // this.getRevItems();
    // this.getRevData();
    // this.getUsers();
  }

  getRevItems() {
    this.http.getRevData().subscribe(data => {
      // Read the result field from the JSON response.
      this.tabsSource.next(data);
    });
  }

  getRevData() {
    this.http.getRevData().subscribe(data => {
      // Read the result field from the JSON response.
      // console.log(data);
      this.menuSource.next(data);
    });
  }
}
