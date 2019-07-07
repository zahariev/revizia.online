import { Component, Input, ElementRef } from "@angular/core";
import { Statement } from "@angular/compiler";
import { Item } from "app/shared/models/item.model";

import { RevService } from "app/shared/services/rev.service";
import { SheetComponent } from "../sheet.component";

@Component({
  selector: "revizia-sheet",
  templateUrl: "./revizia-sheet.component.html",
  styleUrls: ["./revizia-sheet.component.css"]
})
export class ReviziaSheetComponent extends SheetComponent {
  @Input() date: any;
  @Input() editable: Boolean;
  @Input() tabIdx: string;
  @Input() tabName: string;

  editField: string;

  dataList;
  menuList;
  nextFocus: any;
  // dataList: Array<any> = [];
  // viewList: Array<any> = [];
  rev;
  focus: any;
  history: Array<any> = [];

  constructor(public dat: RevService, public el: ElementRef) {
    super(dat, el);
    this.columnList.length = 3;
  }

  ngOnInit() {
    this.dataList = this.dat.revizia[this.date];
  }
}
