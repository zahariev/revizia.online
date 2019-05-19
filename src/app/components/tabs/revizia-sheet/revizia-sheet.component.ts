import { Component, Input } from "@angular/core";
import { Statement } from "@angular/compiler";
import { Item } from "app/shared/models/item.model";

// import { RevService } from "app/shared/services/rev.service";

@Component({
  selector: "revizia-sheet",
  templateUrl: "./revizia-sheet.component.html",
  styleUrls: ["./revizia-sheet.component.css"]
})
export class ReviziaSheetComponent {
  @Input() date;
  @Input() editable: Boolean;

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

  menuList: Array<Item> = [
    {
      id: 0,
      name: "Кафе",
      qty: 0.007,
      price: 2.2,
      round: 1
    },
    { id: 1, name: "Кола", qty: 1, price: 2, round: 0.5 },
    {
      id: 2,
      name: "Водка",
      qty: 0.05,
      price: 3,
      round: 0.5
    },
    {
      id: 3,
      name: "Сок",
      qty: 0.2,
      price: 2,
      round: 0.5
    },
    {
      id: 4,
      name: "Уиски",
      qty: 45,
      price: 6,
      round: 0.5
    },
    {
      id: 5,
      name: "Вино",
      qty: 0.15,
      price: 5,
      round: 1
    }
  ];

  nextFocus: any;
  // dataList: Array<any> = [];
  viewList: Array<any> = [];
  focussableElements: any;

  focus: any;
  activeEl: any;
  contentChange: Boolean = false;
  history: Array<any> = [];

  constructor() {
    this.dataList = localStorage.dataList
      ? JSON.parse(localStorage.dataList)
      : this.dataList;
    this.gridInit();
  }

  gridInit() {
    var tempList: Array<any> = [];
    this.menuList.forEach((item, id) => {
      tempList[id] = this.viewItemCalc(
        this.dataList.filter(i => {
          return i.id == item.id;
        })[0],
        item
      );
    });

    this.viewList = tempList;
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

    if (this.contentChange) {
      newItem[property] = Number(value);
      this.history.push(
        JSON.parse(localStorage.dataList || "{}")[item.id] ||
          this.dataList[item.id]
      );
      // console.log(this.history);
    } else el.innerHTML = newItem[property] || "";
    this.viewItemCalc(newItem, menuItem);
    // this.gridInit();
    localStorage.dataList = JSON.stringify(this.dataList);
    this.contentChange = false;
  }

  undoValue() {
    var item = this.history.pop();
    // console.log(item);
    if (!item) return;
    // console.log(this.dataList[item.id]);

    this.dataList[item.id] = item;
    localStorage.dataList = JSON.stringify(this.dataList);
    this.viewList[item.id] = item;
    // this.gridInit();
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
        // console.log("default");
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

    if (index + step < 2) return;
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
