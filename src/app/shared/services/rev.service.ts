import { Injectable } from "@angular/core";
import {
  taraItem,
  reviziaItem,
  cashItem,
  Store
} from "app/shared/models/item.model";

import { Router, ActivatedRoute } from "@angular/router";
import * as firebase from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { DataService } from "./data.service";

@Injectable()
export class RevService {
  cashItems = [
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
      name: "консумация",
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
      name: "НПЛ",
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

  storeData = new Store();

  cashData = [];

  // view = [];
  public menuList = [{ name: "", data: [] }];
  public revData = [];
  public taraData = [];
  public taraList = [new taraItem()];

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
  public activeDate;
  public activeDateIdx;
  public activeTabIdx: number = 1;

  private tempSummary = {};
  private cashSummary = {};

  public cashSheetSuma = {};
  public cashSheetSum = {};
  // private summary = {};
  public revList = {};
  public cashList = {};
  private revKeys = [];
  private newRevList = {};
  public firstLoad: boolean = true;
  private afs;
  private DbData;
  private DbRevData;
  public navigateToAreaID: number = 0;
  public containerName;
  changedFrom = "Local";
  conn;
  conn2;

  /* Login credentials    */
  /*                      */
  db_key: string = "test"; //"JulJuD8xEvE6sptbL3cT"
  storeName: string = "";
  areaID: number = 0;
  areaName: string = "loading data.....";

  testData;

  constructor(
    public data: DataService,
    afs: AngularFirestore,
    private router: Router // private route: ActivatedRoute
  ) {
    this.revData[0] = {};
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      // if(e instanceof NavigationEnd)
      // console.log(e.snapshot.params.id);
      if (e.snapshot && e.snapshot.params.id > -1)
        this.navigateToAreaID = e.snapshot.params.id;
      // else this.areaID = 0;
    });

    this.db_key = localStorage.userID || 0;

    this.DbData = afs.collection("databases").doc(this.db_key);
    this.DbRevData = afs.collection("revSheets").doc(this.db_key);

    this.conn = this.DbData.snapshotChanges().subscribe(res => {
      const changedFrom = res.payload.metadata.hasPendingWrites
        ? "Local"
        : "Server";

      const data = res.payload.data();
      // console.log(res.payload.metadata.hasPendingWrites);
      // console.log(data);

      // ToDO ask if new or add credetial to existing db
      if (!res.payload.exists) this.setNewStore();
      if (changedFrom == "Server" && data) this.setChangesFromServer(data);

      if (
        this.navigateToAreaID &&
        this.storeData.areas[this.navigateToAreaID]
      ) {
        this.areaID = this.navigateToAreaID;
        delete this.navigateToAreaID;
        this.changeArea(this.areaID);
      }

      // this.setNewRevSheet();
    });

    this.conn2 = this.DbRevData.snapshotChanges().subscribe(res => {
      const changedFrom = res.payload.metadata.hasPendingWrites
        ? "Local"
        : "Server";

      const data = res.payload.data();
      // console.log(res.payload.metadata.hasPendingWrites);

      // ToDO ask if new or add credetial to existing db
      if (!res.payload.exists) this.setNewRevSheet();
      if (changedFrom == "Server" && data) {
        this.revData = data.revData || this.revData;
        this.revList = this.returnList("revData");
      }
      // this.setNewRevSheet();
      if (
        this.navigateToAreaID &&
        this.storeData.areas[this.navigateToAreaID]
      ) {
        this.areaID = this.navigateToAreaID;
        delete this.navigateToAreaID;
        this.changeArea(this.areaID);
      }
    });
  }

  private setNewStore() {
    // console.log("newStore");

    var data = {};
    data["revData"] = this["revData"];
    data["cashData"] = this["cashData"];
    data["taraData"] = this["taraData"];
    data["storeData"] = this["storeData"];
    data["menuList"] = this["menuList"];
    // }

    this.DbData.set(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });
  }

  private setNewRevSheet() {
    // console.log("newRevSheet");

    var data = {};
    data["revData"] = [];
    data["revData"][0] = {};
    data["revData"][0].data = this.revData[0].data; //[{ qerfg: "" }];
    data["revData"][1] = {};
    data["revData"][1].data = this.revData[1].data;
    // }

    this.DbRevData.set(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });
  }

  private revListSortByDate() {
    var rev = {};
    this.revKeys = Object.keys(this.revList || {});
    this.revKeys.sort();

    this.cashSheetView["sum"] = {};
    this.revKeys.forEach(day => {
      rev[day] = this.revList[day];
      this.revSheetView[day] = {};
    });

    this.revList = rev;
  }

  public changeArea(areaID = this.areaID) {
    // url areaID
    if (this.navigateToAreaID) {
      console.log(this.navigateToAreaID);
      if (this.storeData.areas[areaID]) this.areaID = this.navigateToAreaID;
      delete this.navigateToAreaID;
      // console.log(this.areaID);
    }

    // console.log(this.areaID);
    if (this.storeData.areas[areaID]) this.areaID = areaID;
    else return;

    this.router.navigateByUrl("area/" + areaID).then(() => {
      // console.log(this.areaID);

      this.areaName = this.storeData.areas[this.areaID].name;

      this.revList = this.returnList("revData");

      this.cashList = this.returnList("cashData");

      this.taraList = this.returnList("taraData");
      //this.revData[this.areaID].data.filter = "";

      // console.log(this.revKeys);

      window.document.title = this.areaName + " " + this.storeData.name;
      // console.log(this.cashList);

      this.revListSortByDate();
      this.calculateSheets();
    });
    // console.log(this.cashList);
  }

  public returnList(data) {
    if (!this[data][this.areaID]) {
      this[data][this.areaID] = {};
    }
    if (!this[data][this.areaID].data) this[data][this.areaID].data = {};
    return this[data][this.areaID].data;
  }

  public changeStore(storeName) {
    // console.log(areaID);

    // if (this.revData[areaID]) this.areaID = areaID;
    this.router.navigateByUrl("area/" + this.areaID);
    this.revList = this.revData[this.areaID].data;
    this.areaName = this.storeData.areas[this.areaID].name;

    window.document.title = this.areaName + " " + this.storeData.name;
    this.revListSortByDate();
    this.calculateSheets();
  }

  public changeAreaName(name) {
    this.storeData.areas[this.areaID].name = name;
    this.fStore("storeData");
  }

  public changeStoreName(name) {
    this.storeData.name = name;
    this.fStore("storeData");
  }

  areaNew(ev) {
    var data = {};
    data["revData"] = this.revData;
    var id = data["revData"].push({
      id: data["revData"].length,
      name: "newArea"
    });
    data["taraData"] = this.taraData;
    var id = data["taraData"].push({
      id: data["taraData"].length,
      name: "newArea"
    });

    data["storeData"] = this.storeData;
    var id = data["storeData"]["areas"].push({
      id: data["storeData"]["areas"].length,
      name: "newArea"
    });

    //console.log(id);

    this.DbData.update(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });
  }

  private setChangesFromServer(data) {
    //this.getDataFromLocalBackup();

    // no localStorage

    this.menuList = data.menuList || this.menuList;
    this.revData = data.revData || this.revData;
    this.revList = this.returnList("revData");
    this.cashData = data.cashData || this.cashData;
    this.cashList = this.returnList("cashData");
    this.storeData = data.storeData || this.storeData;
    this.taraData = data.taraData || this.taraData;
    // this.taraList = data.taraList || this.taraList;
    this.taraList = this.returnList("taraData");
    this.areaName = this.storeData.areas[this.areaID]
      ? this.storeData.areas[this.areaID].name
      : "set areaName";

    window.document.title = this.areaName + " " + this.storeData.name;

    this.revListSortByDate();
    this.calculateSheets();
  }

  private getDataFromLocalBackup() {
    let localSt = this.getLocalSt("bar Kicks_");

    console.log(localSt);

    // return;
    let data = {};
    // with Local Storage
    this.menuList = localSt["menuList"] || this.menuList;
    this.revData = localSt["revData"] || this.revData;
    this.revList = this.returnList("revData");
    this.cashData = localSt["cashData"] || this.cashData;
    this.cashList = this.returnList("cashData");
    this.taraData = localSt["taraData"];
    this.taraList = this.returnList("taraData");

    data["menuList"] = this["menuList"];
    data["revData"] = this["revData"];
    data["cashData"] = this["cashData"];
    data["taraData"] = this["taraData"];
    data["storeData"] = {
      name: "bar Kicks",
      areas: [{ name: "Old bar" }, { name: "New bar" }]
    };
    // this.DbData.set(JSON.parse(JSON.stringify(data))).catch(function(error) {
    //   console.error(error);
    // });
  }

  public fStore(name = "revList"): void {
    var json: string;
    // console.log(this.cashData);

    this.calculateSheets();
    let data = {};

    switch (name) {
      case "revList":
        data["revData"] = this["revData"] || [];
        // data["revData"][this.areaID] = this["revData"][this.areaID] || {};
        // data["revData"][this.areaID].data = this.returnList("revData");
        this.DbRevData.update(JSON.parse(JSON.stringify(data))).catch(function(
          error
        ) {
          console.error(error);
        });
        break;
      case "cashData":
        data["cashData"] = this["cashData"] || [];
        // data["cashData"][this.areaID] = this["cashData"][this.areaID] || {};
        // data["cashData"][this.areaID].data = this.returnList("cashData");
        break;
      case "taraData":
        data["taraData"] = this["taraData"];
        // data["taraData"][this.areaID] = data["taraData"][this.areaID] || {};
        // data["taraData"][this.areaID].data = this.taraList;
        break;
      default:
        data[name] = this[name];
    }

    this.DbData.update(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });

    //backup on localStore
    this.localStore();
    this.containerName = "";
  }

  public localStore(): void {
    var json: string;

    // this.calculateSheets();

    var dataList = [
      "menuList",
      "revData",
      "sumSheetView",
      "taraData",
      "cashData",
      "storeData"
    ];
    var sumData = {};
    this.containerName = "";
    dataList.forEach((name, idx) => {
      sumData[name] = JSON.parse(JSON.stringify(this[name]));

      // }
    });
    json = JSON.stringify(sumData);
    localStorage.setItem(
      this.storeData.name + "_", //+ this.areaID
      json
      // CryptoJS.AES.encrypt(json, "secret key 123").toString()
    );
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
    this.fStore();
    return true;
  }

  public addMenuTab() {
    var tab = {
      name: "newTab",
      data: []
    };
    this.menuList.push(tab);
    // this.fStore("menuList");
  }

  public removeMenuTab() {
    if (this.revList) this.menuList.splice(this.tabSelectedIdx, 1);
  }

  public addCashTab() {
    var tab = {
      name: "newTab",
      data: []
    };
    // this.cashList.push(tab);
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

  public removeRevSheet(date) {
    if (!date) date = this.activeDate;

    if (this.revList[date]) delete this.revList[date];
    console.log(Object.keys(this.revList)[this.activeDateIdx]);

    // if tab is last move active focus on last after deletion
    if (!Object.keys(this.revList)[this.activeDateIdx])
      this.activeTabIdx = this.activeTabIdx - 1;
    this.revListSortByDate();
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
    this.fStore("taraData");
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

  public calcDailyCashSheets(date) {
    this.cashSheetView[date] = {};
    this.cashSheetSuma = {};
    this.cashSheetSum = {};
    this.cashSheetSuma[date] = 0;

    // console.log(date);

    let cashList = this.cashData[this.areaID]
      ? this.cashData[this.areaID].data
      : [];
    // console.log(cashList[date]);
    let tempSuma = 0;
    let tempSum = 0;
    let tempTabSuma = {};
    this.cashItems.forEach((tab, idx) => {
      var tempCashSheet: Array<any> = [];
      // var emptyRow = new cashItem(idx, "", 0, 0);
      // tab.data.forEach((cItem, id) => {
      tempCashSheet = [];
      if (cashList[date]) {
        tempSuma = 0;
        cashList[date].forEach(i => {
          // console.log(i);
          tempSuma += (i.suma || 0) * 1;
          tempSum += (i.sum || 0) * 1;
          if (i.tabIdx == idx) tempCashSheet.push(i);
        });
      } else {
        cashList[date] = [];
        for (let j; j < 4; j++) {
          tempCashSheet.push(new cashItem(idx, "", 0, 0, 0));
        }
      }
      this.cashSheetSuma[date] += tempSuma;
      this.cashSheetSum[date] += tempSuma;
      // this.cashSummary[date][tab.name]["sum"] += item.sum;
      // this.cashSummary[date]["sumTotal"] += Number(item.sum) || 0;

      // });

      // let j = tempCash.length;
      // console.log(i);
      // for (i; i < 4; i++) {
      //   tempCash.push(new cashItem(idx, "", 0, 0));
      // }
      // console.log(tempSuma);

      this.cashSheetView[date][tab.name] = tempCashSheet;
      this.cashSheetView["sum"][tab.name] = tempSuma;
      this.cashSheetView["sum"]["suma"] += tempSuma;
    });
  }

  public calculateRevSheet(date) {
    // console.log(date);

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
          if (date == this.revKeys[this.revKeys.length - 1])
            tempTara[id] = this.taraItemSums(
              this.tempSummary[tab.name][id],
              itm
            );

          // console.log(tempTara[id].netStart);

          this.tempSummary["sumTotal"] += Number(itm.sum) || 0;
        }
        // end each tab
      });
      this.revSheetView[date][tab.name] = tempRev;

      if (date == this.revKeys[this.revKeys.length - 1])
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
        case "qtyBruto":
        case "qty":
        case "cost":
        case "round":
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

  private taraItemSums(menuItm, itm, query = 0) {
    var menuItem = JSON.parse(JSON.stringify(menuItm));
    var revItem = JSON.parse(JSON.stringify(itm));

    var item = this.taraList.filter(i => {
      //[this.areaID].data.
      return i.id == menuItem.id;
    })[0];

    if (!item) {
      item = new taraItem(menuItem.id);
      this.taraList.push(item); //[this.areaID].data
    }
    // item.start = item.start || item.netStart;
    // var item = taraItem[this.areaID].data;
    item.net =
      Math.round((<number>item.bruto1 - <number>item.tara1) * 1000) / 1000;
    if (!item.net)
      item.net =
        Math.round(((<number>item.bruto - item.tara) / 0.7) * 1000) / 1000;
    // 1;
    // console.log(item.net);

    if (item.net <= 0) item.net = 1;
    item.end =
      revItem.ends -
      <number>item.taraQty * item.tara -
      <number>item.taraQty1 * <number>item.tara1;

    item.end =
      <number>Math.round((item.end * 100) / item.net) / 100 +
      (<number>item.inStore || 0);

    item.name = menuItem.name;
    item["netDiff"] =
      Math.round(
        (<number>(item.start || item.netStart) + <number>item.buy - item.end) *
          100
      ) / 100;
    // if (item.net != 1)

    // if (query) item.start = item.end;
    // console.log(menuItem);
    item.diff =
      Math.round(
        (menuItem.roundSold / menuItem.qtyBruto - (item["netDiff"] || 0)) * 100
      ) / 100;
    item["diffCash"] =
      Math.round(item.diff * menuItem.qtyBruto * menuItem["price"] * 100) / 100;
    return item;
  }

  private revItemCalculator(menuItem, date, prevDayIdx) {
    var prevDay = this.revKeys[prevDayIdx];
    // console.log(this.revList);

    var revItem = this.revList[date].filter(i => {
      return i.id == menuItem.id;
    })[0];

    if (!revItem) {
      revItem = new reviziaItem(menuItem.id);
      this.revList[date].push(revItem);
    }
    var prevEnds;
    if (prevDayIdx < 0) {
      prevEnds = this.taraList.filter(i => {
        return i.id == menuItem.id;
      })[0];
      prevEnds = prevEnds ? prevEnds["startRev"] : 0;
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
      Math.round(
        Math.round(item.diff / (item.qty * item.round)) * item.round * 100
      ) / 100;
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
    // console.log("change");
  }
}
