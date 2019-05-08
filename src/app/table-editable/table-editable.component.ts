import { Component } from "@angular/core";
import { Statement } from "@angular/compiler";

import { RevService } from "../shared/services/rev.service";

@Component({
  selector: "table-editable",
  templateUrl: "./table-editable.component.html",
  styleUrls: ["./table-editable.component.css"]
})
export class TableEditableComponent {
  editField: string;

  itemList: Array<any> = [
    {
      id: 0,
      name: "Кафе",
      minus: 0,
      mplus: 0,
      starts: 2.1,
      ends: 0
    },
    {
      id: 1,
      name: "Кола",
      minus: 0,
      mplus: 0,
      starts: 45,
      ends: 0
    },
    {
      id: 2,
      name: "Водка",
      minus: 0,
      mplus: 0,
      starts: 1.4,
      ends: 0
    },
    {
      id: 3,
      name: "Сок",
      minus: 0,
      mplus: 0,
      starts: 4.1,
      ends: 0
    },
    {
      id: 4,
      name: "Уиски",
      minus: 0,
      mplus: 0,
      starts: 1440,
      ends: 0
    },
    {
      id: 5,
      name: "Вино",
      minus: 0,
      mplus: 0,
      starts: 22,
      ends: 0
    }
  ];

  menuList: Array<any> = [
    {
      id: 0,
      name: "Кафе",
      qty: 0.007,
      price: 2.2,
      round: 1,
      f: ""
    },
    { id: 1, name: "Кола", qty: 1, price: 2, round: 0.5, f: "" },
    {
      id: 2,
      name: "Водка",
      qty: 0.05,
      price: 3,
      round: 0.5,
      f: ""
    },
    {
      id: 3,
      name: "Сок",
      qty: 0.2,
      price: 2,
      round: 0.5,
      f: ""
    },
    {
      id: 4,
      name: "Уиски",
      qty: 45,
      price: 6,
      round: 0.5,
      f: ""
    },
    {
      id: 5,
      name: "Вино",
      qty: 0.15,
      price: 5,
      round: 1,
      f: ""
    }
  ];

  nextFocus: any;
  dataList: Array<any> = [];

  focussableElements: any;

  fontSize: number = 1;
  focus: any;
  activeEl: any;

  constructor() {
    this.dataList = localStorage.dataList
      ? JSON.parse(localStorage.dataList)
      : this.itemList;

    this.dataList.forEach((item, id) => {
      this.dataList[id] = this.calcItemProperties(item);
    });
  }

  ngAfterViewInit() {
    this.fontSize = parseFloat(localStorage.getItem("zoom")) || this.fontSize;
    document.body.style.fontSize = this.fontSize.toString() + "rem";
  }

  calcItemProperties(item) {
    var menuItem = this.menuList[item.id];
    item.diff =
      Math.round(
        (item.starts * 1 - item.ends * 1 + item.mplus * 1 + item.minus * 1) *
          1000
      ) / 1000;
    item.qtySold = item.diff / menuItem.qty;
    item.price = menuItem.price;
    item.roundSold =
      Math.round(item.diff / (menuItem.qty * menuItem.round)) * menuItem.round;
    item.sum = item.roundSold * menuItem.price;

    // console.log(menuItem.round);
    return item;
  }

  updateList(item, property: string, num: any) {
    // const editValue = el.textContent;
    var newItem = this.dataList[item.id];
    var menuItem = this.menuList[item.id];

    newItem[property] = Number(num);
    // calculating sum fields
    this.calcItemProperties(item);
    localStorage.dataList = JSON.stringify(this.dataList);
  }

  onBlur(item, elName, event) {
    var el = event.target;
    el.contentEditable = "false";
    this.updateList(item, elName, el.textContent);
  }

  onMdown(item: any, elName: string, el: any) {
    // var el = event.target;
    if (this.activeEl == el) {
      // console.log("md");
      this.activeEl = "select";
      // this.selectText(document.activeElement);
    } else {
      this.activeEl = el;
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
    // this.log(event);
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
      default:
        if (this.activeEl != "editable") this.selectText();
        this.makeEditable(el);
        setTimeout(el.focus(), 100);
    }
  }

  selectText(cell = document.activeElement) {
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
    el.contentEditable = "true";
    this.activeEl = "editable";
  }

  zoomIn() {
    this.fontSize += 0.1;
    document.body.style.fontSize = this.fontSize + "em";
    localStorage.setItem("zoom", this.fontSize.toString());
  }
  zoomOut() {
    this.fontSize -= 0.1;
    document.body.style.fontSize = this.fontSize + "em";
    localStorage.setItem("zoom", this.fontSize.toString());
  }

  focusNextElement(el, step = 1) {
    this.focussableElements = document.querySelectorAll("[tabindex]");
    var index = Array.from(this.focussableElements).indexOf(el);

    if (index > -1) {
      window.getSelection().removeAllRanges();
      var nextElement =
        this.focussableElements[index + step] || this.focussableElements[index];

      if (index) el.contentEditable = "false";

      nextElement.focus();
      this.activeEl = nextElement;
    }
  }
}
