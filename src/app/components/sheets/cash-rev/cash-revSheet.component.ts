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
  templateUrl: "./cash-revSheet.component.html",
  styleUrls: ["./cash-revSheet.component.css"]
})
export class CashRevSheetComponent extends SheetComponent {
  @Input() editable: Boolean;
  @Input() tabIdx: string;
  @Input() date: any;

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
      columnName: "на час",
      name: "cost",
      format: "number",
      editable: true
    },
    {
      columnName: "надница",
      name: "price",
      format: "BGN",
      editable: true
    },
    {
      columnName: "часове",
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
  containerName = "cashData";

  constructor(private data: RevService, public el: ElementRef) {
    super(data, el);
  }

  ngOnInit() {
    console.log(this.tabIdx);

    this.dataList = this.data.cashData[this.date];

    this.gridInit();
  }

  gridInit() {
    // console.log(this.data.cashList[this.tabIdx]);
    //this.dataList[this.tabIdx].data = this.dataList;
    // console.log(this.history);
    this.viewList = this.data.cashData[this.tabIdx].data;
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
    var tabIdx = this.dat.tabCashSelectedIdx;
    var mlist = document.getElementById("cashTab" + tabIdx);
    // this.dat.tabCashScrollPos[tabIdx] = this.dat.tabCashScrollPos[tabIdx] + 2070;
    // if (mlist) {
    //   mlist.parentElement.scrollTo(0, this.dat.tabScrollPos[tabIdx] + 2070);
    // }
    // console.log(this.dataList);
    var rowIdx = this.dataList.push(
      new Item("new" + this.dataList.length.toString(), "", 0, 0, 0, 0)
    );
    this.dataList;
    console.log(this.dataList);

    this.gridInit();
    return rowIdx;
  }
}
