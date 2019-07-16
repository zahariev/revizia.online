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
  selector: "cash-sheet",
  templateUrl: "./cash-sheet.component.html",
  styleUrls: ["./cash-sheet.component.css"]
})
export class CashSheetComponent extends SheetComponent {
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

  menuList;
  dataList;

  nextFocus: any;
  viewList;
  focussableElements: any;

  focus: any;
  activeEl: any;
  contentChange: Boolean = false;
  history: Array<any> = [];

  constructor(private data: RevService, public el: ElementRef) {
    super(data, el);
  }

  ngOnInit() {
    this.dataList = this.data.menuList[this.tabIdx].data;
    this.gridInit();
  }

  gridInit() {
    this.data.menuList[this.tabIdx].data = this.dataList;
    // console.log(this.history);
    this.viewList = this.data.menuList[this.tabIdx].data;
  }

  drop(ev) {}

  addRow(e) {}
}
