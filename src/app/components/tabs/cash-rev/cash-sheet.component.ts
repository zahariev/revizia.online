import { Component, OnInit, ElementRef } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: "tabs-cash-rev",
  templateUrl: "./cash-sheet.component.html",
  styleUrls: ["./cash-sheet.component.css"]
})
export class TabsCashRevComponent implements OnInit {
  // viewList;
  editable: boolean;
  mapTabToScroll = {};
  activeEl: any;
  contentChange: Boolean = false;
  selectedIndex = 0;

  constructor(public data: RevService) {
    // this.viewList = data.menuList;
    this.editable = true;
  }

  ngOnInit() {
    // this.selectedIndex = 1;
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // remove selection text
    var selection = window.getSelection();
    selection.removeAllRanges();
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabCashSelectedIdx = tabChange.index;

    // var mlist = document.getElementById("cashTab" + tabChange.index);

    //if (mlist) {
    // mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    //}
  }
}
