import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Item } from "app/shared/models/item.model";

import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragHandle
} from "@angular/cdk/drag-drop";

import { MatIcon } from "@angular/material/icon";

import { RevService } from "app/shared/services/rev.service";
import { SheetComponent } from "../sheet.component";

@Component({
  selector: "cash-revSheet",
  templateUrl: "./cash-sheet.component.html",
  styleUrls: ["./cash-sheet.component.css"]
})
export class CashRevSheetComponent extends SheetComponent {
  @Input() editable: Boolean;
  @Input() tabIdx: string;

  columnList = [
    // {
    //   name: "id",
    //   format: "number",
    //   editable: true
    // },
    {
      columnName: "Име",
      name: "name",
      format: "string",
      editable: true
    },
    {
      columnName: "дост.Цена",
      name: "cost",
      format: "number",
      editable: true
    },
    {
      columnName: "цена",
      name: "price",
      format: "BGN",
      editable: true
    },
    {
      columnName: "колич.",
      name: "qty",
      format: "number",
      editable: true
    },
    {
      columnName: "закр.",
      name: "round",
      format: "number",
      editable: true
    }
  ];

  focus: any;
  nextFocus: any;
  viewList;
  date = "cashList";
  containerName = "cashList";

  constructor(private data: RevService, public el: ElementRef) {
    super(data, el);
  }

  ngOnInit() {
    this.dataList = this.data.cashList[this.tabIdx].data;
    this.gridInit();
  }

  gridInit() {
    // console.log(this.data.cashList[this.tabIdx]);s
    this.data.cashList[this.tabIdx].data = this.dataList;
    // console.log(this.history);
    this.viewList = this.data.cashList[this.tabIdx].data;
  }

  removeRow(itemIdx, ev) {
    this.dataList[itemIdx].delPosition = itemIdx;
    this.history.push(this.dataList[itemIdx]);
    // console.log(itemIdx);
    this.dataList.splice(itemIdx, 1);

    this.dat.fStore();

    this.gridInit();
  }

  addRow(ev) {
    // TODO scroll one row to bottom
    var tabIdx = this.dat.tabSelectedIdx;
    var mlist = document.getElementById("menuTab" + tabIdx);
    this.dat.tabScrollPos[tabIdx] = this.dat.tabScrollPos[tabIdx] + 2070;
    if (mlist) {
      mlist.parentElement.scrollTo(0, this.dat.tabScrollPos[tabIdx] + 2070);
    }
    var rowIdx = this.dataList.push(
      new Item("new" + this.dataList.length.toString(), "new", 0, 0, 0, 0)
    );

    this.gridInit();
    return rowIdx;
  }

  drop(event: CdkDragDrop<Item[]>) {
    // reorder menu list Items
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
    this.dat.fStore();
    this.gridInit();
  }
}
