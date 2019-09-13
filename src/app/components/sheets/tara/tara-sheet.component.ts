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

  containerName = "taraList";

  constructor(public data: RevService, public el: ElementRef) {
    super(data, el);

    this.columnList.length = 10;
  }

  ngOnInit() {
    this.dataList = this.data.taraList;
  }
}
