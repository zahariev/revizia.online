import { Component, Input, HostBinding } from "@angular/core";

import { RevService } from "app/shared/services/rev.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rev";
  editable: Boolean;
  data1;
  data2;
  buttonName = "CashOut";

  constructor(data: RevService) {
    this.data1 = "prevList";
    this.data2 = "nextList";
    this.editable = true;
  }

  ngAfterViewInit() {}
}
