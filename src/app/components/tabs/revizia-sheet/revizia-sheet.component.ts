import { Component, Input } from "@angular/core";
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

  editField: string;

  dataList;
  prevList;
  nextList;
  menuList;
  nextFocus: any;
  // dataList: Array<any> = [];
  viewList: Array<any> = [];
  focussableElements: any;

  rev;
  focus: any;
  activeEl: any;
  contentChange: Boolean = false;
  history: Array<any> = [];

  constructor(private dat: RevService) {
    this.menuList = dat.menuList;
    this.dataList = dat[this.date];
  }

  ngOnInit() {
    this.dataList = this.dat[this.date];
  }

  gridInit() {
    // console.log("calc");
    this.menuList = this.dat.menuList;
  }

  totalSalesSum() {
    return this.dataList.reduce((total, item) => {
      return +(total * 1) + +item.sum || 0 * 1;
    }, 0);
  }

  updateList(item, property: string, el: any) {
    var idx = this.dataList.indexOf(item);
    var value = el.innerText;
    value = value.replace(/\r?\n|\r\s/g, "");
    // value = value.replace(" ", "");

    var newItem = this.dataList[idx] || {
      id: item.id,
      minus: 0,
      mplus: 0,
      ends: 0
    };
    if (this.contentChange) {
      newItem[property] = Number(value) || value;
      this.history.push(
        JSON.parse(localStorage[this.date] || "{}")[idx] || this.dataList[idx]
      );
    } else el.innerHTML = newItem[property] || "";

    this.dataList = this.dat.calculateSheet(this.date);

    this.dat.store(this.date);
    this.contentChange = false;
  }

  undoValue() {
    var item = this.history.pop();
    if (!item) return;

    this.dataList[item.id] = item;
    this.dat.store(this.date);
  }

  onInput(ev) {
    this.contentChange = true;
  }

  onBlur(item, elName, event) {
    var el = event.target;
    el.contentEditable = "false";
    // console.log(el.innerText);

    this.updateList(item, elName, el);
  }

  onMdown(item: any, elName: string, el: any) {
    if (this.activeEl == el.target) {
      this.activeEl = "select";
    } else {
      this.activeEl = el.target;
    }
  }

  onClick(item: any, elName: string, event: any) {
    // console.log("md");
    if (this.activeEl == "select") {
      this.selectText(document.activeElement);
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
      // console.log(index + step);
      nextElement.focus();
      this.activeEl = nextElement;
    }
  }
}
