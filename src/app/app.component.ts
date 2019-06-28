import { Component, Input, HostBinding, ElementRef } from "@angular/core";

import { RevService } from "app/shared/services/rev.service";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rev";
  editable: Boolean;
  el;
  data;
  tabs = [];
  buttonName = "CashOut";

  constructor(data: RevService, el: ElementRef) {
    this.el = el;
    this.data = data;
    this.tabs = this.data.revKeys;
    // this.data1 = "prevList";
    // this.data2 = "nextList";
    this.editable = true;
  }
  ngAfterViewInit() {
    // console.log(this.el);
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // console.log("ewthgf");
    window.dispatchEvent(new Event("resize"));
    var mlist;

    if (tabChange.index) {
      // revizia tabs
      mlist = document.getElementById("revTab" + this.data.tabSelectedIdx);

      if (mlist) {
        mlist.parentElement.scrollTo(
          0,
          this.data.tabScrollPos[this.data.tabSelectedIdx]
        ); // this fix % scroll disonanse
      }
    } else {
      //Menu tab
      mlist = document.getElementById("menuTab" + this.data.tabSelectedIdx);

      if (mlist) {
        mlist.parentElement.scrollTo(
          0,
          this.data.tabScrollPos[this.data.tabSelectedIdx]
        );
      } else {
      }
    }
  }
}
