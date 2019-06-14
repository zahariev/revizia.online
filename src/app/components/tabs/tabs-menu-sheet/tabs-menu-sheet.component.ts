import { Component, OnInit, ElementRef } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "tabs-menu-sheet",
  templateUrl: "./tabs-menu-sheet.component.html",
  styleUrls: ["./tabs-menu-sheet.component.css"]
})
export class TabsMenuSheetComponent implements OnInit {
  viewList;
  editable: boolean;
  mapTabToScroll = {};

  constructor(public data: RevService) {
    this.viewList = data.menuList;
    this.editable = true;
  }

  ngOnInit() {
    // this.selectedIndex = 1;
    this.data.tabSelectedIdx = 0;
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabSelectedIdx = tabChange.index;
    var mlist = document.getElementById("menuTab" + tabChange.index);

    if (mlist) {
      mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    }
  }
}
