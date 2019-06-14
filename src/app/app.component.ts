import { Component, Input, HostBinding } from "@angular/core";

import { RevService } from "app/shared/services/rev.service";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rev";
  editable: Boolean;
  data;
  data1;
  data2;
  buttonName = "CashOut";

  constructor(data: RevService) {
    this.data = data;
    this.data1 = "prevList";
    this.data2 = "nextList";
    this.editable = true;
  }
  ngAfterViewInit() {}

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // console.log("ewthgf");
    window.dispatchEvent(new Event("resize"));

    if (tabChange.index) {
      // revizia tabs
      var mlist = document.getElementById("revTab" + this.data.tabSelectedIdx);
      // console.log(mlist);
      if (mlist) {
        mlist.parentElement.scrollTo(
          0,
          this.data.tabScrollPos[this.data.tabSelectedIdx]
        );
      }
    } else {
      //Menu tab
      var mlist = document.getElementById("menuTab" + this.data.tabSelectedIdx);
      // console.log(mlist);
      if (mlist) {
        mlist.parentElement.scrollTo(
          0,
          this.data.tabScrollPos[this.data.tabSelectedIdx]
        );
      }
    }
  }
}
