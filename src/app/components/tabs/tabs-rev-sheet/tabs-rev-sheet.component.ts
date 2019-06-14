import { Component, Input } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "tabs-rev-sheet",
  templateUrl: "./tabs-rev-sheet.component.html",
  styleUrls: ["./tabs-rev-sheet.component.css"]
})
export class TabsRevSheetComponent {
  editable: boolean;
  @Input() date: any;
  selectedIndex: number;

  constructor(public data: RevService) {
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
}
