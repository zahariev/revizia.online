import { Component, Input } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "tabs-tara-sheet",
  templateUrl: "./tara-sheet.component.html",
  styleUrls: ["./tara-sheet.component.css"]
})
export class TabsTaraSheetComponent {
  editable: boolean;
  @Input() date: any;
  selectedIndex: number;

  constructor(public data: RevService) {
    // this.data = data;
    this.editable = true;
    this.selectedIndex = data.tabSelectedIdx;
  }
  ngOnInit() {}

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabSelectedIdx = tabChange.index;

    var mlist = document.getElementById("taraTab" + tabChange.index);
    // console.log(mlist);
    if (mlist) {
      mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    }
  }
}
