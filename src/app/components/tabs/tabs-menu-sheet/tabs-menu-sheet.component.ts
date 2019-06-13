import { Component, ElementRef } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "tabs-menu-sheet",
  templateUrl: "./tabs-menu-sheet.component.html",
  styleUrls: ["./tabs-menu-sheet.component.css"]
})
export class TabsMenuSheetComponent {
  viewList;
  editable: boolean;
  mapTabToScroll = {};

  constructor(public data: RevService) {
    this.viewList = data.menuList;
    this.editable = true;
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    this.data.currentTabIndex = tabChange.index;

    // Maintain scroll position of the last scrolled tab idx
    var mlist = document.getElementById("menuTab" + this.data.currentTabIndex);

    if (mlist) {
      mlist.parentElement.scrollTo(
        0,
        this.data.tabScrollPos[this.data.currentTabIndex]
      );
    }
  }
}
