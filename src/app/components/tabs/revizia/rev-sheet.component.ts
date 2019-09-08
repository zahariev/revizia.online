import { Component, Input } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "tabs-rev-sheet",
  templateUrl: "./rev-sheet.component.html",
  styleUrls: ["./rev-sheet.component.css"]
})
export class TabsRevSheetComponent {
  editable: boolean;
  @Input() date: any;
  selectedIndex: number;

  constructor(public data: RevService) {
    // this.data = data;
    // console.log(data.menuList);
    // this.viewList = data.menuList;
    this.editable = true;
    this.selectedIndex = data.tabSelectedIdx;
  }
  ngOnInit() {}

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabSelectedIdx = tabChange.index;

    var mlist = document.getElementById("revTab" + tabChange.index);

    if (mlist) {
      mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    }
  }

  public dayClearIn(e, date): void {
    this.data.revList[date].forEach(i => {
      i.mplus = 0;
      i.minus = 0;
      i.ends = 0;
    });

    this.data.calculateRevSheet(date);
    this.data.fStore();
  }

  public dayClearAll(e, date): void {
    this.dayClearEnd(e, date);
    this.dayClearIn(e, date);

    // this.data.fStore();
  }

  public dayClearEnd(e, date): void {
    this.data.revList[date].forEach(i => {
      i.ends = 0;
    });
    this.data.fStore();
  }
}
