import { Injectable } from "@angular/core";
import { taraItem, reviziaItem, cashItem } from "app/shared/models/item.model";
import * as deepEqual from "deep-equal";

import { map } from "rxjs/operators";
import * as firebase from "firebase";

import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { DataService } from "./data.service";

@Injectable()
export class RevService {
  //  view;= []

  menuList = [
    {
      name: "...loading",
      data: [
        {
          id: "21209..",
          name: "Кафе",
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    }
  ];
  cashList = [
    {
      name: "Заплати",
      data: [
        {
          id: "",
          name: "new",
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    },
    {
      name: "Стоки",
      data: [
        {
          id: "",
          name: "new",
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    },
    {
      name: "Отстъпки",
      data: [
        {
          id: "",
          name: "new",
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    },
    {
      name: "Консумация",
      data: [
        {
          id: "",
          name: "new",
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    }
  ];
  cashData = {};
  revData = {};
  taraList = [];
  taraData = [];
  sumData = {};
  _simpleMode: boolean = false;

  public revSheetView = {};
  public cashSheetView = {};
  public sumSheetView = {};
  public taraSheetView = [];

  // store scroll offset for menu tab and idx
  public tabScrollPos = [];
  public tabSelectedIdx: number = 0;
  public tabCashSelectedIdx: number = 0;

  private tempSummary = {};
  private cashSummary = {};
  // private summary = {};
  public revList = {};
  private revKeys = [];
  private newRevList = {};
  public firstLoad: boolean = true;
  private afs;
  private DbData; //:Observable<any[]>;
  public containerName;
  changedFrom = "Local";
  test;

  constructor(public data: DataService, afs: AngularFirestore) {
    this.DbData = afs.collection("barBilkova").doc("test2"); //"gbjmEZzKZDJSOxcBIt24");
    this.test = afs
      .collection("barBilkova")
      .snapshotChanges()
      .subscribe(res => {
        const changedFrom = res[0].payload.doc.metadata.hasPendingWrites
          ? "Local"
          : "Server";
        const data = res[0].payload.doc.data();

        if (changedFrom == "Server") this.setChangesFromServer(data);
      });

    this.revListInit();
    // console.log(rev);
    this.calculateSheets();
  }

  private revListInit() {
    var rev = {};
    this.revKeys = Object.keys(this.revList);
    this.revKeys.sort();

    this.cashSheetView["sum"] = {};
    this.revKeys.forEach(day => {
      rev[day] = this.revList[day];
      this.revSheetView[day] = {};
    });

    this.revList = rev;
  }

  private setChangesFromServer(data) {
    // console.log(data === {});

    this.menuList =
      data.menuList || this.getLocalSt("menuList") || this.menuList;
    this.revList = data.revList || this.revList; //this.getLocalSt("revData")
    // this.taraList = data.taraData;
    this.taraList =
      data.taraList || this.getLocalSt("taraData") || this.taraList;
    this.cashList = data.cashList || this.cashList;
    this.cashData = data.cashData || {};

    this.revListInit();
    this.calculateSheets();
  }

  public fStore(name = "revList"): void {
    var json: string;

    this.calculateSheets();

    var data = {};
    data[name] = this[name];

    this.DbData.update(data).then();
    // console.log(data);

    this.containerName = "";
  }

  public localStore(): void {
    var json: string;

    this.calculateSheets();
    // return;
    // console.log("localStore");

    var name = ["menuList", "revData", "sumData", "taraData"];
    var dataList = ["menuList", "revList", "sumSheetView", "taraList"];

    this.containerName = "";
    dataList.forEach((data, idx) => {
      json = JSON.stringify(this[data]);
      localStorage.setItem(
        name[idx],
        json
        // CryptoJS.AES.encrypt(json, "secret key 123").toString()
      );
      // }
    });
  }

  public newDayTab(date): boolean {
    var datestring = this.getNewDate(date);

    if (this.revKeys.indexOf(datestring) == -1) {
      this.revKeys.push(datestring);

      this.revList[datestring] = [];

      this.revSheetView[datestring] = {};
      this.calculateSheets();

      this.revKeys.sort();
      this.fStore();
    } else {
      // show calendar controll
      return false;
    }
    return true;
  }

  public addMenuTab() {
    var tab = {
      name: "newTab",
      data: []
    };
    this.menuList.push(tab);
  }

  public addCashTab() {
    var tab = {
      name: "newTab",
      data: []
    };
    this.cashList.push(tab);
  }

  private copyLastDayRevData() {
    var lastDate = this.revKeys.slice(-1)[0];

    var tempList = [];
    this.revList[lastDate].forEach(revItem => {
      var item = this.taraList.filter(taraItem => {
        return taraItem.id == revItem.id;
      })[0];

      if (item) {
        item.startRev = JSON.parse(JSON.stringify(revItem.ends));
        item.netStart = JSON.parse(JSON.stringify(item.end));
      }
    });
  }

  public removeSheet(date) {
    delete this.revList[date];
    this.revListInit();
    this.fStore();
  }

  public newPeriod() {
    this.copyLastDayRevData();
    // console.log(this.taraList[0].startRev);
    this.revList = {};
    this.revList[this.getNewDate(0)] = [];
    // console.log(this.revList);
    this.revKeys = [];
    this.revKeys[0] = this.getNewDate(0);

    var rev = {};
    this.revKeys.forEach(day => {
      this.cashSummary[day] = [];
      this.cashSheetView[day] = {};

      rev[day] = this.revList[day];
      this.revSheetView[day] = {};
    });
    // console.log(this.taraList[0].startRev);
    this.revList = rev;
    this.fStore();
    this.fStore("taraList");
  }

  /* * * * * * * * * * * *
   *    private methods
   * * * * * * * * * * * */

  // private getLocal() {
  //   var data = ["menuList", "revData", "cashData", "taraData", "sumData"];
  //   var name = ["menuList", "revList", "cashList", "taraList", "tempSummary"];

  //   this.containerName = "";
  //   data.forEach((data, idx) => {
  //     this[name[idx]] = JSON.parse(localStorage.getItem(data));
  //     console.log(name[idx]);
  //   });
  // }

  private getLocalSt(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  public calculateSheets() {
    this.tempSummary = {};
    // this.tempCashSummary = {};
    this.tempSummary["sumTotal"] = 0;
    // this.tempCashSummary["sumTotal"] = 0;
    this.revKeys.forEach(date => {
      this.cashSheetView["sum"] = {};
      this.calcDailyCashSheets(date);
      this.calculateRevSheet(date);
    });
  }

  calcDailyCashSheets(date) {
    this.cashSheetView[date] = {};
    if (!this.cashData[date]) return;

    this.cashList.forEach((tab, idx) => {
      var tempCash: Array<any> = [];
      // var emptyRow = new cashItem(idx, "", 0, 0);
      tab.data.forEach((cashItem, id) => {
        tempCash = [];
        this.cashData[date].forEach(i => {
          if (i.tabIdx == idx) tempCash.push(i);
        });

        // this.cashSummary[date][tab.name]["sum"] += item.sum;
        // this.cashSummary[date]["sumTotal"] += Number(item.sum) || 0;
      });
      var i = tempCash.length;
      // console.log(i);
      for (i; i < 4; i++) {
        tempCash.push(new cashItem(idx, "", 0, 0));
      }
      this.cashSheetView[date][tab.name] = tempCash;
      this.cashSheetView["sum"][tab.name] = tempCash;
    });
  }

  public calculateRevSheet(date) {
    this[date + "Sum"] = 0;
    this.menuList.forEach(tab => {
      if (!this.tempSummary[tab.name]) this.tempSummary[tab.name] = [];

      var tempRev: Array<any> = [];
      var tempTara: Array<any> = [];

      tab.data.forEach((menuItem, id) => {
        var item = JSON.parse(JSON.stringify(menuItem));
        var prevDayIdx = this.revKeys.indexOf(date) - 1;

        var itm = this.revItemCalculator(item, date, prevDayIdx);
        if (itm) {
          tempRev[id] = itm;

          this[date + "Sum"] += Number(itm.sum) || 0;

          this.tempSummary[tab.name][id] = this.sumProp(
            this.tempSummary[tab.name][id],
            itm
          );
          tempTara[id] = this.taraItemSums(this.tempSummary[tab.name][id], itm);
          // console.log(tempTara[id].netStart);

          this.tempSummary["sumTotal"] += Number(itm.sum) || 0;
        }
      });
      this.revSheetView[date][tab.name] = tempRev;
      this.taraSheetView[tab.name] = tempTara;
    });
    this.sumSheetView = this.tempSummary;
    this.sumSheetView["sumTotal"] =
      Math.round(this.sumSheetView["sumTotal"] * 1000) / 1000;
    return this[date];
  }

  private sumProp(a, b) {
    if (!a) return b;
    var obj = {};
    Object.keys(a).map(function(x) {
      switch (x) {
        case "id":
        case "name":
        case "starts":
        case "price":
          obj[x] = a[x];
          break;
        case "ends":
          obj[x] = b[x];
          break;
        default:
          obj[x] = a[x] + b[x];
          obj[x] = Math.round(obj[x] * 1000) / 1000;
          break;
      }
    });
    return obj;
  }

  private taraItemSums(menuItm, itm) {
    var menuItem = JSON.parse(JSON.stringify(menuItm));
    var revItem = JSON.parse(JSON.stringify(itm));

    var item = this.taraList.filter(i => {
      return i.id == menuItem.id;
    })[0];

    if (!item) {
      item = new taraItem(menuItem.id);
      this.taraList.push(item);
    }

    item.net =
      Math.round((item.bruto1 - item.tara1) * 10000) / 10000 ||
      Math.round(((item.bruto - item.tara) / 0.7) * 10000) / 10000 ||
      1;

    item.end =
      revItem.ends || 0 - item.taraQty * item.tara - item.taraQty1 * item.tara1;

    item.end =
      Math.round((item.end * 100) / item.net) / 100 + (item.inStore || 0);
    item.name = menuItem.name;
    item.diff = item.start + item.buy - item.end;
    item.diff = Math.round((menuItem.diff / item.net - item.diff) * 100) / 100;
    return item;
  }

  private revItemCalculator(menuItem, date, prevDayIdx) {
    var prevDay = this.revKeys[prevDayIdx];

    var revItem = this.revList[date].filter(i => {
      return i.id == menuItem.id;
    })[0];

    if (!revItem) {
      revItem = new reviziaItem(menuItem.id);
      this.revList[date].push(revItem);
    }
    var prevEnds = 0;
    if (prevDayIdx < 0) {
      prevEnds =
        this.taraList.filter(i => {
          return i.id == menuItem.id;
        })[0]["startRev"] || 0;
    } //prevDay = date;
    else {
      prevEnds =
        this.revList[prevDay].filter(i => {
          return i.id == menuItem.id;
        })[0]["ends"] || 0;
    }

    revItem.starts = prevEnds || 0;
    var item = Object.assign(revItem, menuItem);
    item = this.viewItemCalc(item);

    return item;
  }

  private viewItemCalc(item) {
    item.diff =
      Math.round(
        (item.starts * 1 - item.ends * 1 + item.mplus * 1 + item.minus * 1) *
          1000
      ) / 1000;

    item.qtySold = Math.round((item.diff / item.qty) * 1000) / 1000;
    item.roundSold =
      Math.round(item.diff / (item.qty * item.round)) * item.round;
    item.sum = Math.round(item.roundSold * item.price * 100) / 100;

    return item;
  }

  private getNewDate(date) {
    var d = date || new Date();
    if (d.getHours() < 9 && !date) {
      d = new Date(d.getTime() - (d.getHours() + 1) * 60 * 60 * 1000);
    }
    var datestring =
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate().toString()).slice(-2);
    return datestring;
  }

  // To Do
  private changeDate() {
    console.log("change");
  }
}
