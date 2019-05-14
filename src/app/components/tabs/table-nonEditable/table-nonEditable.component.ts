import { Component, Input } from "@angular/core";
import { Statement } from "@angular/compiler";

// import { RevService } from "../shared/services/rev.service";

@Component({
  selector: "table-nonEditable",
  templateUrl: "./table-nonEditable.component.html",
  styleUrls: ["../sheet-editable/sheet-editable.component.css"]
})
export class TableNonEditableComponent {
  @Input() date;
  @Input() editable;

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
}
