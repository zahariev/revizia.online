import { Component, OnInit, Input } from "@angular/core";
import { Item } from "app/shared/models/item.model";

@Component({
  selector: "menu-sheet",
  templateUrl: "./menu-sheet.component.html",
  styleUrls: ["./menu-sheet.component.css"]
})
export class MenuSheetComponent implements OnInit {
  @Input() editable: Boolean;

  columnList = [
    // {
    //   name: "id",
    //   format: "number",
    //   editable: true
    // },
    {
      name: "name",
      format: "string",
      editable: true
    },
    {
      name: "cost",
      format: "number",
      editable: true
    },
    {
      name: "price",
      format: "BGN",
      editable: true
    },
    {
      name: "qty",
      format: "number",
      editable: true
    },
    {
      name: "round",
      format: "number",
      editable: true
    }
  ];

  menuList: Array<Item> = [
    {
      id: 0,
      name: "Кафе",
      cost: 0,
      qty: 0.007,
      price: 2.2,
      round: 1
    },
    { id: 1, name: "Кола", cost: 0, qty: 1, price: 2, round: 0.5 },
    {
      id: 2,
      name: "Водка",
      qty: 0.05,
      cost: 0,
      price: 3,
      round: 0.5
    },
    {
      id: 3,
      name: "Сок",
      qty: 0.2,
      cost: 0,
      price: 2,
      round: 0.5
    },
    {
      id: 4,
      name: "Уиски",
      qty: 45,
      cost: 0,
      price: 6,
      round: 0.5
    },
    {
      id: 5,
      name: "Вино",
      qty: 0.15,
      cost: 0,
      price: 5,
      round: 1
    }
  ];

  dataList = [];
  nextFocus: any;
  // dataList: Array<any> = [];
  viewList: Array<any> = [];
  focussableElements: any;

  focus: any;
  activeEl: any;
  contentChange: Boolean = false;
  history: Array<any> = [];

  constructor() {
    this.dataList = localStorage.menuList
      ? JSON.parse(localStorage.menuList)
      : this.menuList;
    this.gridInit();
  }

  ngOnInit() {
    // this.gridInit();
  }

  gridInit() {
    this.viewList = [...this.dataList];
  }

  updateList(item, property: string, el: any) {
    var value = el.innerText;
    value = value.replace(/\r?\n|\r\s/g, "");
    // value = value.replace(" ", "");

    var newItem = this.dataList[item.id];
    if (this.contentChange) {
      newItem[property] = Number(value) || value;
      this.history.push(
        JSON.parse(localStorage.menuList || "{}")[item.id] ||
          this.dataList[item.id]
      );
    } else el.innerHTML = newItem[property] || "";

    this.gridInit();
    localStorage.menuList = JSON.stringify(this.dataList);
    this.contentChange = false;
  }

  undoValue() {
    var item = this.history.pop();

    if (!item) return;
    if (item.del) {
      var idx = item.del;
      delete item.del;
      this.dataList.splice(idx, 0, item);
    } else this.dataList[item.id] = item;
    localStorage.menuList = JSON.stringify(this.dataList);
    // this.viewList[item.id] = item;
    this.gridInit();
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
    // console.log(document.activeElement);
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
        console.log(this.activeEl);
        event.target.innerText = item[property];
        event.preventDefault();
        // this.activeEl = el;
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
    // console.log(el);
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

  removeRow(itemId, ev) {
    this.dataList[itemId].delPosition = itemId;
    this.history.push(this.dataList[itemId]);
    // console.log(this.history);
    this.dataList.splice(itemId, 1);
    localStorage.menuList = JSON.stringify(this.dataList);
    // this.viewList[item.id] = item;
    this.gridInit();
  }

  addRow(ev) {
    this.dataList.push(new Item(this.dataList.length, "new", 0, 0, 0, 0));
    this.gridInit();
  }
}
