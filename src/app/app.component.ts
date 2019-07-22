import { Component, ElementRef } from "@angular/core";

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
  showDatePicker: Boolean;
  el;
  data;
  tabs = [];
  buttonName = "CashOut";

  hideMenu: boolean;
  hideTara: boolean;
  hideSummary: boolean;

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
    // tab selector in place
    window.dispatchEvent(new Event("resize"));

    var scrollTab;
    var scrollPos = this.data.tabScrollPos[this.data.tabSelectedIdx];
    // console.log(tabChange);
    scrollTab =
      document.getElementById("revTab" + this.data.tabSelectedIdx) ||
      document.getElementById("menuTab" + this.data.tabSelectedIdx) ||
      document.getElementById("sumTab" + this.data.tabSelectedIdx) ||
      document.getElementById("taraTab" + this.data.tabSelectedIdx);

    if (scrollTab) {
      scrollTab.parentElement.scrollTo(0, scrollPos);
    } else {
    }
  }

  addTab(ev) {
    // if (!this.data.newDayTab())
    {
      // pop calendar contorll
      this.showDatePicker = !this.showDatePicker;
    }
  }

  onDateChanged(date) {
    this.showDatePicker = false;
    this.data.newDayTab(date);
    // console.log(date);
  }
}
