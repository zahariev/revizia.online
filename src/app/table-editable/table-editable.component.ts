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

  dataList: Array<any> = [
    {
      id: 0,
      minus: 0,
      mplus: 0,
      starts: 0,
      ends: 0
    },
    {
      id: 1,
      minus: 0,
      mplus: 0,
      starts: 0,
      ends: 0
    },
    {
      id: 2,
      minus: 0,
      mplus: 0,
      starts: 0,
      ends: 0
    },
    {
      id: 3,
      minus: 0,
      mplus: 0,
      starts: 0,
      ends: 0
    },
    {
      id: 4,
      minus: 0,
      mplus: 0,
      starts: 0,
      ends: 0
    },
    {
      id: 5,
      minus: 0,
      mplus: 0,
      starts: 0,
      ends: 0
    }
  ];

  prevList: Array<any> = [
    {
      id: 0,

      minus: 0,
      mplus: 0,
      ends: 2.1
    },
    {
      id: 1,
      minus: 0,
      mplus: 0,
      ends: 45
    },
    {
      id: 2,
      minus: 0,
      mplus: 0,
      ends: 2.1
    },
    {
      id: 3,
      minus: 0,
      mplus: 0,
      ends: 45
    },
    {
      id: 4,
      minus: 0,
      mplus: 0,
      ends: 1440
    },
    {
      id: 5,
      minus: 0,
      mplus: 0,
      ends: 11
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
  // dataList: Array<any> = [];
  viewList: Array<any> = [];
  focussableElements: any;

  fontSize: number = 1;
  focus: any;
  activeEl: any;
  contentChange: Boolean = false;

  constructor() {
    this.dataList = localStorage.dataList
      ? JSON.parse(localStorage.dataList)
      : this.dataList;

    this.menuList.forEach((item, id) => {
      this.viewList[id] = this.viewItemCalc(
        this.dataList.filter(i => {
          return i.id == item.id;
        })[0],
        item
      );
    });
  }

  ngAfterViewInit() {
    this.fontSize = parseFloat(localStorage.getItem("zoom")) || this.fontSize;
    document.body.style.fontSize = this.fontSize.toString() + "rem";
  }

  viewItemCalc(item, menuItem) {
    item.starts = Number(
      this.prevList.filter(i => {
        return i.id == menuItem.id;
      })[0].ends
    );
    // console.log(item);
    item.diff =
      Math.round(
        (item.starts * 1 - item.ends * 1 + item.mplus * 1 + item.minus * 1) *
          1000
      ) / 1000;

    item.qtySold = item.diff / menuItem.qty;
    item.price = menuItem.price;
    item.name = menuItem.name;
    item.id = menuItem.id;
    item.roundSold =
      Math.round(item.diff / (menuItem.qty * menuItem.round)) * menuItem.round;
    item.sum = Math.round(item.roundSold * menuItem.price * 100) / 100;
    // console.log(item);
    return item;
  }

  totalSalesSum() {
    return this.dataList.reduce((total, item) => {
      return +(total * 1) + +item.sum || 0 * 1;
    }, 0);
  }

  updateList(item, property: string, el: any) {
    var value = el.innerText;
    value = value.replace(/\r?\n|\r\s/g, "");
    // value = value.replace(" ", "");

    var newItem = this.dataList[item.id];
    var menuItem = this.menuList[item.id];
    if (this.contentChange) newItem[property] = Number(value);
    else el.innerHTML = newItem[property] || "";
    this.viewItemCalc(newItem, menuItem);
    localStorage.dataList = JSON.stringify(this.dataList);
    this.contentChange = false;
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
    if (this.activeEl == el) {
      this.activeEl = "select";
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
