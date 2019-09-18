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
  @Input() tabIdx: number;
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
      tabIdx: [1, 2, 3, 4, 5]
    }
    // {
    //   columnName: "закр.",
    //   name: "round",
    //   format: "number",
    //   editable: true
    // }
  ];
  cashData = {};
  focus: any;
  nextFocus: any;
  viewList;
  containerName = "cashList";
  row = 3;
  constructor(public data: RevService, public el: ElementRef) {
    super(data, el);
    // console.log(data.cashSheetView);
  }

  ngOnInit() {
    // console.log(this.tabName);

    if (!this.data.cashItems) {
      //cashData[this.date]
      this.data.cashItems = [];

      // this.dat.fStore("cashItems");
    }
    this.dataList = this.data.cashList[this.date] || [];

    this.gridInit();
  }

  gridInit() {
    // this.cashData = this.data.cashData;
    // this.data.cashList = this.cashData[this.data.areaID]
    //   ? this.cashData[this.data.areaID].data
    //   : this.data.cashList;

    //this.dataList = this.data.cashList[this.date] || [];
    // console.log(this.dataList);

    this.data.cashList[this.date] = this.dataList;
    // this.data.cashSheetView[this.date][this.tabName];
  }

  addRow(ev) {
    var rowIdx = this.dataList.push(
      new cashItem(Number(this.tabIdx), "", 0, 0)
    );

    this.data.calcDailyCashSheets(this.date);
    this.gridInit();
    return rowIdx;
  }

  updateList(itm, property: string, el: any) {
    // this.dat.firstLoad = false;
    this.gridInit();

    var itemExists = this.data.cashList[this.date].filter(i => {
      return i.id == itm.id;
    })[0];
    // console.log(itm);
    var item = itemExists || JSON.parse(JSON.stringify(itm));

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
    // console.log(item);

    if (!itemExists) this.dataList.push(item);

    // this.dat.calculateSheets();
    // this.dat.localStore();
    // console.log(this.dat.cashData);

    // this.dat.containerName = this.containerName;
    this.dat.fStore("cashData");
    this.contentChange = false;

    this.gridInit();
  }

  drop(e) {}
}
