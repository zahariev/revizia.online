import {
  Component,
  OnInit,
  ElementRef,
  ɵCodegenComponentFactoryResolver
} from "@angular/core";

import { RevService } from "app/shared/services/rev.service";
@Component({
  selector: "app-sheet",
  template: "NO UI TO BE FOUND HERE!"
})
export class SheetComponent implements OnInit {
  focussableElements: any;
  dataList;
  history: Array<any> = [];
  date;
  activeEl;
  tabIdx;
  editable;
  contentChange: Boolean = false;
  columnList = { length: 0 };

  constructor(public dat: RevService, public el: ElementRef) {}

  ngOnInit() {}

  updateList(item, property: string, el: any) {
    var itemExists = this.dataList.filter(i => {
      return i.id == item.id;
    })[0];
    item = itemExists || item;

    // ||{
    //   id: item.id,
    //   minus: 0,
    //   mplus: 0,
    //   ends: 0
    // }

    // format edited text field
    var value = el.innerText + "";
    el.innerText = "";
    value = value.replace(/\r?\n|\r\s/g, "");

    if (this.contentChange) {
      var oldItem = JSON.parse(JSON.stringify(item));
      this.history.push(oldItem);
      item[property] = Number(value) || value;

      if (!itemExists) {
        // console.log(idx);
        // console.log(this.dataList);
        this.dataList.push(item);
      } else {
        itemExists = item;
      }
      // console.log(this.dat.taraList);
      el.innerText = value;
    } else {
      // not to double values in text filed on chrome
      el.innerHTML = item[property] || "";
    }

    this.dat.store();
    this.contentChange = false;
    this.gridInit();
  }

  gridInit() {}

  onInput(item, elName, event) {
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

  keyUp(item, property: string, event: any) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return true;
        break;
    }

    return true;
  }

  selectText(cell = document.activeElement) {
    if (!this.editable) return;
    var range, selection;
    if (this.activeEl == "select") this.activeEl = "editable";
    // const input = window.document;
    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(cell);
      selection.removeAllRanges();
      selection.addRange(range);
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

      nextElement.focus();
      this.activeEl = nextElement;
    } else {
      this.focussableElements = document.querySelectorAll(".table td.name");
      this.focussableElements[0].focus();
    }
  }

  // maintain scroll position by tab idx
  mousewheel(ev: Event) {
    var scrollPos = this.el.nativeElement.offsetParent.firstChild.scrollTop;
    this.dat.tabScrollPos[this.tabIdx] = scrollPos;
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

    this.dat.store();
    this.gridInit();
  }
}
