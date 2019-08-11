import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Item } from "app/shared/models/item.model";

import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragHandle,
  transferArrayItem,
  CdkDragEnter,
  CdkDragExit,
  CdkDragStart,
  CdkDrag
} from "@angular/cdk/drag-drop";

import { MatIcon } from "@angular/material/icon";

import { RevService } from "app/shared/services/rev.service";
import { SheetComponent } from "../sheet.component";

@Component({
  selector: "menu-sheet",
  templateUrl: "./menu-sheet.component.html",
  styleUrls: ["./menu-sheet.component.css"]
})
export class MenuSheetComponent extends SheetComponent {
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
    },
    {
      columnName: "бр.в литър",
      name: "qtyBruto",
      format: "number",
      editable: true
    },
    {
      columnName: "дост.Цена",
      name: "cost",
      format: "number",
      editable: true
    }
  ];

  focus: any;
  nextFocus: any;
  viewList;
  date = "menuList";
  containerName = "menuList";

  constructor(public dat: RevService, public el: ElementRef) {
    super(dat, el);
  }

  ngOnInit() {
    this.dataList = this.dat.menuList[this.tabIdx].data;
    this.gridInit();
  }

  gridInit() {
    // this.dat.menuList[this.tabIdx].data = this.dataList;
    this.viewList = this.dat.menuList[this.tabIdx].data;
  }

  removeRow(itemIdx, ev) {
    this.dataList[itemIdx].delPosition = itemIdx;
    this.history.push(this.dataList[itemIdx]);
    // console.log(itemIdx);
    this.dataList.splice(itemIdx, 1);
    this.gridInit();
    this.dat.fStore("menuList");
  }

  addRow(ev) {
    // TODO scroll one row to bottom
    var tabIdx = this.dat.tabSelectedIdx;
    var mlist = document.getElementById("menuTab" + tabIdx);
    this.dat.tabScrollPos[tabIdx] = this.dat.tabScrollPos[tabIdx] + 2070;
    if (mlist) {
      mlist.parentElement.scrollTo(0, this.dat.tabScrollPos[tabIdx] + 2070);
    }
    var idx = Math.random()
      .toString(36)
      .substr(2, 9);
    var rowIdx = this.dataList.push(new Item(idx, "newItem", 0, 0, 0, 0));

    this.gridInit();
    return rowIdx;
  }

  drop(event: CdkDragDrop<Item[]>) {
    // reorder menu list Items
    var histItem = { prev: event.previousIndex, curr: event.currentIndex };
    this.history.push(histItem);
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);

    this.dat.fStore(this.containerName);
    this.gridInit();
  }

  dropToTab(event: CdkDragDrop<Item[]>) {
    console.log(event);
    // reorder menu tabs
    // var histItem = { prev: event.previousIndex, curr: event.currentIndex };
    // this.history.push(histItem);
    moveItemInArray(this.dat.menuList, event.previousIndex, event.currentIndex);

    this.dataList = this.dat.menuList[this.tabIdx].data;
    this.viewList = this.dat.menuList[this.tabIdx].data;

    this.dat.fStore("menuList");
  }
}
