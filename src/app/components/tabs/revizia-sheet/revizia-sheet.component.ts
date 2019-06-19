import { Component, Input, ElementRef } from "@angular/core";
import { Statement } from "@angular/compiler";
import { Item } from "app/shared/models/item.model";

import { RevService } from "app/shared/services/rev.service";

@Component({
  selector: "revizia-sheet",
  templateUrl: "./revizia-sheet.component.html",
  styleUrls: ["./revizia-sheet.component.css"]
})
export class ReviziaSheetComponent {
  @Input() date: any;
  @Input() editable: Boolean;
  @Input() tabIdx: string;
  @Input() tabName: string;

  editField: string;

  dataList;
  prevList;
  nextList;
  menuList;
  nextFocus: any;
  // dataList: Array<any> = [];
  // viewList: Array<any> = [];
  focussableElements: any;
  rev;
  focus: any;
  activeEl: any;
  contentChange: Boolean = false;
  history: Array<any> = [];

  constructor(public dat: RevService, public el: ElementRef) {}

  ngOnInit() {
    this.dataList = this.dat.revizia[this.date];
  }

  updateList(item, property: string, el: any) {
    var idx = this.dataList.indexOf(item);
    var value = el.innerText + "";
    el.innerText = "";
    value = value.replace(/\r?\n|\r\s/g, "");
    // console.log(idx);
    // value = value.replace(" ", "");

    var updateItem = this.dataList[idx] || {
      id: item.id,
      minus: 0,
      mplus: 0,
      ends: 0
    };
    // console.log(value);
    if (this.contentChange) {
      var oldItem = JSON.parse(JSON.stringify(item));
      this.history.push(oldItem);
      console.log("change");
      updateItem[property] = Number(value) || value;
      if (idx == -1) {
        this.dataList.push(updateItem);
      }

      el.innerText = value;
    } else el.innerHTML = updateItem[property] || "";

    // var menuItem = this.dat.menuList.filter(i => {
    //   return i.id == item.id;
    // })[0];
    // item = this.dat.viewItemCalc(item, menuItem);

    this.dat.store(this.date);
    this.contentChange = false;
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
      this.dat[this.date][idx] = item;
    }

    this.dat.store(this.date);
  }

  onInput(item, elName, event) {
    var el = event.target;
    this.contentChange = true;
  }

  onBlur(item, elName, event) {
    var el = event.target;
    // console.log(el.innerText);
    if (this.contentChange) this.updateList(item, elName, el);

    el.contentEditable = "false";
    event.preventDefault();
  }

  onClick(item: any, elName: string, event: any) {
    if (this.activeEl == "select") {
      this.makeEditable(event.target);
      // event.preventDefault();
    } else if (this.activeEl == event.target) {
      this.selectText(event.target);
      this.activeEl = "select";
    } else {
      this.activeEl = event.target;
    }
  }

  onDoubleClick(item: any, elName: string, event: any) {
    //this.makeEditable(event.target);
  }

  keyDown(item, property: string, event: any) {
    // console.log(event);
    var el = event.target;
    // console.log(event);
    switch (event.key) {
      case "Enter":
        if (this.activeEl == "editable") {
          this.focusNextElement(el, 3);

          event.preventDefault();
        } else {
          this.selectText(el);
          this.makeEditable(el);

          event.preventDefault();
        }

        break;

      case "ArrowUp":
        this.focusNextElement(el, -3);
        break;
      case "ArrowDown":
        this.focusNextElement(el, 3);
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
        // el.focus();
        setTimeout(el.focus(), 100);
    }
  }

  selectText(cell = document.activeElement) {
    if (!this.editable) return;
    var range, selection;
    if (this.activeEl == "select") this.activeEl = "editable";
    const input = window.document;
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
        return true;
        break;
    }

    return true;
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

      nextElement.focus();
      this.activeEl = nextElement;
    } else {
      this.focussableElements = document.querySelectorAll(".table td.name");
      this.focussableElements[0].focus();
    }
  }

  mousewheel(ev: Event) {
    // maintain scroll position by tab idx
    var scrollPos = this.el.nativeElement.offsetParent.firstChild.scrollTop;
    this.dat.tabScrollPos[this.tabIdx] = scrollPos;
  }
}
