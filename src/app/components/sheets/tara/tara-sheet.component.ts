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

  gridInit() {
    // console.log("gridInit");
    // console.log(this.data.areaID);

    // on areaChange change dataset
    this.dataList = this.data.taraData[this.data.areaID]
      ? this.data.taraData[this.data.areaID].data
      : this.data.taraList;
  }

  ngAfterViewInit() {
    // console.log("viewInit");
    // console.log(this.data.areaID);

    // on areaChange change dataset
    this.dataList = this.data.taraData[this.data.areaID]
      ? this.data.taraData[this.data.areaID].data
      : this.data.taraList;
  }

  updateList(itm, property: string, el: any) {
    // console.log(itm);

    this.data.firstLoad = false;
    var itemExists = this.dataList.filter(i => {
      return i.id == itm.id;
    })[0];
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
    // console.log(item === oldItem);

    // this.dat.calculateSheets();
    // this.dat.localStore();

    this.data.containerName = this.containerName;
    this.data.fStore(this.dat.containerName);

    this.data.fStore("menuList");
    this.contentChange = false;

    this.gridInit();
  }
}
