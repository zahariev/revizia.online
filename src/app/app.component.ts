import { Component, Input, HostBinding } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rev";
  editable: Boolean;
  prevList = [
    {
      id: 0,
      minus: 0,
      mplus: 0,
      ends: 2.1
    },
    {
      id: 1,
      minus: 0,
      mplus: 0,
      ends: 45
    },
    {
      id: 2,
      minus: 0,
      mplus: 0,
      ends: 2.1
    },
    {
      id: 3,
      minus: 0,
      mplus: 0,
      ends: 45
    },
    {
      id: 4,
      minus: 0,
      mplus: 0,
      ends: 1440
    },
    {
      id: 5,
      minus: 0,
      mplus: 0,
      ends: 11
    }
  ];
  data;
  data2;
  buttonName = "CashOut";

  constructor() {
    this.data = "prevList";
    this.data2 = "nextList";
    this.editable = true;
  }

  ngAfterViewInit() {}
}
