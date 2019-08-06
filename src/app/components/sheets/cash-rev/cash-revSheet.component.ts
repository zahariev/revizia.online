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
      editable: true,
      tabIdx: "all"
    },
    {
      columnName: "сума",
      name: "sum",
      format: "number",
      editable: true,
      tabIdx: "all"
    },
    {
      columnName: "оборот",
      name: "suma",
      format: "BGN",
      editable: true,
      tabIdx: [0]
    },
    {
      columnName: "бележка",
      name: "comment",
      format: "number",
      editable: true,
      tabIdx: "all"
    }
    // {
    //   columnName: "закр.",
    //   name: "round",
    //   format: "number",
    //   editable: true
    // }
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

  updateList(itm, property: string, el: any) {
    // this.dat.firstLoad = false;
    // var itemExists = this.dataList.filter(i => {
    //   return i.id == itm.id;
    // })[0];

    var item = JSON.parse(JSON.stringify(itm));

    // format edited text field
    var value = el.innerText + "";
    el.innerText = "";
    value = value.replace(/\r?\n|\r\s/g, "");

    if (this.contentChange) {
      var oldItem = JSON.parse(JSON.stringify(item));
      this.history.push(oldItem);
      item[property] = Number(value) || value;
      el.innerText = value;
    } else {
      // not to double values in text filed on chrome
      el.innerHTML = item[property] || "";
    }

    // this.dat.calculateSheets();
    // this.dat.localStore();

    this.dat.containerName = this.containerName;
    this.dat.fStore(this.dat.containerName);
    this.contentChange = false;

    this.gridInit();
  }

  drop(e) {}
}
