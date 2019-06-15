import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Item } from "app/shared/models/item.model";

import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragHandle
} from "@angular/cdk/drag-drop";

import { MatIcon } from "@angular/material";

import { RevService } from "app/shared/services/rev.service";

@Component({
  selector: "menu-sheet",
  templateUrl: "./menu-sheet.component.html",
  styleUrls: ["./menu-sheet.component.css"]
})
export class MenuSheetComponent implements OnInit {
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

  constructor(private data: RevService, public el: ElementRef) {}

  ngOnInit() {
    this.dataList = this.data.menuList[this.tabIdx].data;
    this.gridInit();
  }

  gridInit() {
    this.data.menuList[this.tabIdx].data = this.dataList;
    // console.log(this.history);
    this.viewList = this.data.menuList[this.tabIdx].data;
  }

  updateList(item, property: string, el: any) {
    var idx = this.dataList.indexOf(item);
    var value = el.innerText;
    value = value.replace(/\r?\n|\r\s/g, "");
    // value = value.replace(" ", "");
    // console.log(this.dataList);
    var newItem = this.dataList[idx];
    if (this.contentChange) {
      var oldItem = JSON.parse(JSON.stringify(item));
      this.history.push(oldItem);
      newItem[property] = Number(value) || value;
    } else el.innerHTML = newItem[property] || "";

    this.gridInit();
    this.data.store("menuList");
    this.contentChange = false;
  }

  onInput(ev) {
    this.contentChange = true;
  }

  onBlur(item, elName, event) {
    var el = event.target;
    el.contentEditable = "false";

    this.updateList(item, elName, el);
  }

  onMdown(item: any, elName: string, el: any) {
    if (this.activeEl == el.target) {
      this.activeEl = "select";
    } else {
      this.activeEl = el.target;
    }
    // console.log(this.activeEl);
  }

  onClick(item: any, elName: string, event: any) {
    if (this.activeEl == "select") {
      this.makeEditable(event.target);
      event.preventDefault();
    } else {
      this.selectText(event.target);
      event.preventDefault();
    }
  }

  keyDown(item, property: string, event: any) {
    // console.log(event);
    var el = event.target;
    var row = this.columnList.length;
    // console.log(event.key);
    switch (event.key) {
      case "Enter":
        if (this.activeEl == "editable") {
          this.focusNextElement(el, row); //colummnList.length

          event.preventDefault();
        } else {
          this.selectText(el);
          this.makeEditable(el);

          event.preventDefault();
        }

        break;

      case "ArrowUp":
        this.focusNextElement(el, -row);
        break;
      case "ArrowDown":
        this.focusNextElement(el, row);
        break;
      case "ArrowLeft":
        if (this.activeEl != "editable") this.focusNextElement(el, -1);
        break;
      case "ArrowRight":
        if (this.activeEl != "editable") this.focusNextElement(el, 1);
        break;

      case "Escape":
        event.target.innerText = item[property];
        event.preventDefault();
        this.focusNextElement(el, 0);
        break;
      case "z":
        if (event.ctrlKey || event.metaKey) this.undoValue();
        break;
      case "Meta":
      case "Control":
      case "Shift":
      case " ":
        break;
      default:
        if (this.activeEl != "editable") this.selectText();
        this.makeEditable(el);
        setTimeout(el.focus(), 10);
    }
  }

  selectText(cell = document.activeElement) {
    if (!this.editable) return;
    var range, selection;
    if (this.activeEl == "select") this.activeEl = "editable";
    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(cell);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  keyUp(item, property: string, event: any) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return;
        break;
    }
  }

  makeEditable(el) {
    if (!this.editable) return;
    el.contentEditable = "true";
    this.activeEl = "editable";
  }

  focusNextElement(el, step = 1) {
    this.focussableElements = document.querySelectorAll("[tabindex]");
    var index = Array.from(this.focussableElements).indexOf(el);

    if (index + step < 3) return;
    if (index > -1) {
      window.getSelection().removeAllRanges();
      var nextElement =
        this.focussableElements[index + step] || this.focussableElements[index];

      if (index) el.contentEditable = "false";

      // console.log(nextElement);
      nextElement.focus();
      this.activeEl = nextElement;
    } else {
      this.focussableElements = document.querySelectorAll(".table td.name");
      // console.log(this.focussableElements);
      this.focussableElements[0].focus();
    }
  }

  removeRow(itemIdx, ev) {
    this.dataList[itemIdx].delPosition = itemIdx;
    this.history.push(this.dataList[itemIdx]);
    // console.log(itemIdx);
    this.dataList.splice(itemIdx, 1);

    this.data.store("menuList");
    // this.viewList[item.id] = item;

    this.gridInit();
  }

  undoValue() {
    var item = this.history.pop();
    var idx: any;
    if (!item) return;
    if (item.delPosition) {
      var idx = item.delPosition;
      delete item.delPosition;
      this.dataList.splice(idx, 0, item);
    } else {
      idx = this.dataList.filter(itm => itm.id == item.id)[0];
      idx = this.dataList.indexOf(idx);
      this.dataList[idx] = item;
    }
    // localStorage.menuList = JSON.stringify(this.dataList);

    this.data.store("menuList");
    this.gridInit();
  }

  addRow(ev) {
    // console.log("add");
    var rowIdx = this.dataList.push(
      new Item("new" + this.dataList.length.toString(), "new", 0, 0, 0, 0)
    );

    this.gridInit();
    return rowIdx;
  }

  mousewheel(ev: Event) {
    // maintain scroll position by tab idx
    var scrollPos = this.el.nativeElement.offsetParent.firstChild.scrollTop;
    this.data.tabScrollPos[this.tabIdx] = scrollPos;
  }

  drop(event: CdkDragDrop<Item[]>) {
    // reorder menu list Items
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
    this.data.store("menuList");
    this.gridInit();
  }
}
