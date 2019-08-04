import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { cashItem } from "app/shared/models/item.model";

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
  @Input() tabName: string;
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
    // console.log(data.cashSheetView);
  }

  ngOnInit() {
    // console.log(this.tabName);

    this.dataList = this.data.cashData[this.date] || [];

    this.gridInit();
  }

  gridInit() {
    this.data.cashData[this.date] = this.dataList;
    this.viewList = this.data.cashSheetView[this.date][this.tabName];
  }

  addRow(ev) {
    var rowIdx = this.dataList.push(new cashItem(this.tabName, "", 0, 0, 0, 0));
    // this.dataList;
    console.log(this.dataList);

    this.data.calcDailyCashSheets(this.date);
    this.gridInit();
    return rowIdx;
  }
}
