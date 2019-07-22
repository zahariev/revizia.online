import { Component, Input, ElementRef } from "@angular/core";
import { Statement } from "@angular/compiler";
import { Item } from "app/shared/models/item.model";

import { RevService } from "app/shared/services/rev.service";
import { SheetComponent } from "../sheet.component";

@Component({
  selector: "tara-sheet",
  templateUrl: "./tara-sheet.component.html",
  styleUrls: ["./tara-sheet.component.css"]
})
export class TaraSheetComponent extends SheetComponent {
  @Input() editable: Boolean;
  @Input() tabIdx: string;
  @Input() tabName: string;

  viewList;

  date = "taraList";

  constructor(public dat: RevService, public el: ElementRef) {
    super(dat, el);

    this.columnList.length = 8;
  }

  ngOnInit() {
    console.log(this.dat.taraSheetView[this.tabName]);
    this.dataList = this.dat.taraSheetView[this.tabName];
  }
}
