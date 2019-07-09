import { Component, Input } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "tabs-sum-sheet",
  templateUrl: "./tabs-sum-sheet.component.html",
  styleUrls: ["./tabs-sum-sheet.component.css"]
})
export class TabsSumSheetComponent {
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
}
