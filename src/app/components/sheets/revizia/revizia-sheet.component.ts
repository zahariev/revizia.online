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

  dataList;
  viewList;
  containerName = "revList";

  constructor(public dat: RevService, public el: ElementRef) {
    super(dat, el);
    this.columnList.length = 3;
  }

  ngOnInit() {
    //this.dataList = this.dat.revList[this.date];
  }

  gridInit() {
    this.dataList = this.dat.revList[this.date];
  }

  ngAfterViewInit() {
    // console.log("viewInit revsheet");

    // on areaChange change dataset
    this.dataList = this.dat.revList[this.date];
  }
}
