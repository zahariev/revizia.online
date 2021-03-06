import { Injectable } from '@angular/core';
import {
  taraItem,
  reviziaItem,
  cashItem,
  Store
} from 'app/shared/models/item.model';

import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import * as Ably from 'ably';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { DataService } from './data.service';

// tslint:disable-next-line: no-console
const log = console.log;

@Injectable()
export class RevService {

  cashItems = [
    {
      name: 'Заплати',
      data: [
        {
          id: '',
          name: 'new',
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    },
    {
      name: 'Стоки',
      data: [
        {
          id: '',
          name: 'new',
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    },
    {
      name: 'консумация',
      data: [
        {
          id: '',
          name: 'new',
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        }
      ]
    },
    {
      name: 'НПЛ',
      data: [
        {
          id: '',
          name: 'new',
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
  public menuList = [{ name: '', data: [] }];
  public revData = [];
  public taraData = [];
  public taraList = [new taraItem()];

  sumData = {};
  _simpleMode = false;

  public revSheetView = {};
  public cashSheetView: any = {};
  public sumSheetView: any = {};
  public taraSheetView = [];

  // store scroll offset for menu tab and idx
  public tabScrollPos = [];
  public tabSelectedIdx = 0;
  public tabCashSelectedIdx = 0;
  public activeDate;
  public activeDateIdx;
  public activeTabIdx = 1;

  private tempSummary: any = {};
  private cashSummary = {};

  public cashSheetSuma = {};
  public cashSheetSum = {};
  public cashTabSummary = {};
  // private summary = {};
  public revList = {};
  public cashList = {};
  private revKeys = [];
  private newRevList = {};
  public firstLoad = true;
  private afs;
  private DbData;
  private DbRevData;
  public navigateToAreaID = 0;
  public containerName;
  changedFrom = 'Local';
  conn;
  conn2;
  // tslint:disable-next-line: no-console


  /* Login credentials    */
  /*                      */
  dbKey = 'test'; // "JulJuD8xEvE6sptbL3cT"
  storeName = '';
  areaID = 0;
  areaName = 'loading data.....';
  ably;
  testData;
  dbFire;

  constructor(
    public data: DataService,
    afs: AngularFirestore,
    private router: Router // private route: ActivatedRoute
  ) {

    const options: Ably.Types.ClientOptions = { key: 'rn6d5g.qtu7ig:oOXK_23V3M8K3TY8' };
    const msgClient = new Ably.Realtime('rn6d5g.qtu7ig:oOXK_23V3M8K3TY8');
    this.ably = msgClient.channels.get('test');

    // ably.subscribe('update_item', data4 => {

    //   log(data4);
    //   // this.smsNotifications.push(data.data);
    // });
    this.revData[0] = {};

    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      // if(e instanceof NavigationEnd)
      if (e.snapshot && e.snapshot.params.id > -1) {
        this.navigateToAreaID = e.snapshot.params.id;
      }
      // else this.areaID = 0;
    });

    this.dbKey = localStorage.userID || 0;

    this.DbData = afs.collection('databases').doc(this.dbKey);
    this.DbRevData = afs.collection('revSheets').doc(this.dbKey);


    // this.dbFire = this.DbData.collection('menu');
    // this.dbFire.snapshotChanges().subscribe(
    //   subCol => {
    //     //log(subCol);
    //     subCol.forEach(doc => {
    //       // log('Sub Document ID: ', doc);
    //       // doc.name = 'pesho';

    //       //this.dbFire.doc(doc.payload.doc.id).update({ name: 'asdfg' });
    //       log(doc.payload.doc.data());

    //     });

    //   });




    this.conn = this.DbData.snapshotChanges().subscribe(res => {
      const changedFrom = res.payload.metadata.hasPendingWrites
        ? 'Local' : 'Server';

      const dt = res.payload.data();
      // console.log(res.payload.metadata.hasPendingWrites);
      // console.log(data);
      // ably.publish('init_item', dt.taraData);
      log(dt.menuList);
      log(JSON.stringify(dt.menuList));
      log(JSON.stringify(dt.menuList).length);
      // ToDO ask if new or add credetial to existing db
      if (!res.payload.exists) {
        this.setNewStore();
      }
      if (changedFrom === 'Server' && dt) {
        this.setChangesFromServer(dt);
        //this.ably.publish('init_item', dt);

      }

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
    // return;
    this.conn2 = this.DbRevData.snapshotChanges().subscribe(res => {
      const changedFrom = res.payload.metadata.hasPendingWrites
        ? 'Local'
        : 'Server';

      const dt = res.payload.data();
      // console.log(res.payload.metadata.hasPendingWrites);
      // log(dt);
      // ably.publish('init_item', dt.revData);
      // ToDO ask if new or add credetial to existing db

      log(dt.revData);
      // log(this.getByteLen(dt));
      log(JSON.stringify(dt).length);

      if (!res.payload.exists) {
        this.setNewRevSheet();
      }
      if (changedFrom === 'Server' && dt) {
        this.revData = dt.revData || this.revData;
        this.revList = this.returnList('revData');

        //log(dt.revData);
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


  send_msg(event: string, tName: string, id: string, field: string, value: any) {

    log(id);
    switch (event) {
      case 'create':

        break;
      case 'update':

        break;

    }
    // this.ably.publish(event);
  }



  private setNewStore() {
    // console.log("newStore");

    const data: any = {};
    data.revData = this.revData;
    data.cashData = this.cashData;
    data.taraData = this.taraData;
    data.storeData = this.storeData;
    data.menuList = this.menuList;
    // }

    this.DbData.set(JSON.parse(JSON.stringify(data))).catch(error => {
      console.error(error);
    });
  }

  private setNewRevSheet() {
    // console.log("newRevSheet");

    const data: any = {};
    data.revData = [];
    data.revData[0] = {};
    data.revData[0].data = this.revData[0].data; // [{ qerfg: "" }];
    // data.revData[1] = {};
    // data.revData[1].data = this.revData[1].data;
    // }

    this.DbRevData.set(JSON.parse(JSON.stringify(data))).catch(error => {
      console.error(error);
    });
  }

  private revListSortByDate() {
    const rev = {};
    this.revKeys = Object.keys(this.revList || {});
    this.revKeys.sort();

    this.cashSheetView.sum = {};
    this.revKeys.forEach(day => {
      rev[day] = this.revList[day];
      this.revSheetView[day] = {};
    });

    this.revList = rev;
  }

  public changeArea(areaID = this.areaID) {
    // url areaID
    if (this.navigateToAreaID) {
      if (this.storeData.areas[areaID]) {
        this.areaID = this.navigateToAreaID;
      }
      delete this.navigateToAreaID;
    }

    // console.log(this.areaID);
    if (this.storeData.areas[areaID]) {
      this.areaID = areaID;
    } else {
      return;
    }

    this.router.navigateByUrl('area/' + areaID).then(() => {
      // console.log(this.areaID);

      this.areaName = this.storeData.areas[this.areaID].name;

      this.revList = this.returnList('revData');

      this.cashList = this.returnList('cashData');

      this.taraList = this.returnList('taraData');
      // this.revData[this.areaID].data.filter = "";

      // console.log(this.revKeys);

      window.document.title = this.areaName + ' ' + this.storeData.name;
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
    if (!this[data][this.areaID].data) {
      this[data][this.areaID].data = [];
    }
    return this[data][this.areaID].data;
  }

  public changeStore(storeName) {
    // console.log(areaID);

    // if (this.revData[areaID]) this.areaID = areaID;
    this.router.navigateByUrl('area/' + this.areaID).then();
    this.revList = this.revData[this.areaID].data;
    this.areaName = this.storeData.areas[this.areaID].name;

    window.document.title = this.areaName + ' ' + this.storeData.name;
    this.revListSortByDate();
    this.calculateSheets();
  }

  public changeAreaName(name) {
    this.storeData.areas[this.areaID].name = name;
    this.fStore('storeData');
  }

  public changeStoreName(name) {
    this.storeData.name = name;
    this.fStore('storeData');
  }

  public areaNew(ev) {
    this.ably.publish('newArea', { timestamp: Date.now() });

    const data: any = {};
    data.revData = this.revData;
    data.revData.push({
      id: data.revData.length,
      name: 'newArea'
    });
    // console.log(this.taraData);
    data.taraData = this.taraData;
    data.taraData.push({
      id: data.taraData.length,
      name: 'newArea'
    });

    data.storeData = this.storeData;
    data.storeData.areas.push({
      id: data.storeData.areas.length,
      name: 'newArea'
    });

    // console.log(id);

    this.DbData.update(JSON.parse(JSON.stringify(data))).catch(error => {
      console.error(error);
    });
  }

  private setChangesFromServer(data) {
    // console.log(data);

    // this.getDataFromLocalBackup();

    // no localStorage

    this.menuList = data.menuList || this.menuList;
    this.cashData = data.cashData || this.cashData;
    this.cashList = this.returnList('cashData');
    this.storeData = data.storeData || this.storeData;
    this.taraData = data.taraData || this.taraData;
    this.taraList = this.returnList('taraData');

    this.areaName = this.storeData.areas[this.areaID]
      ? this.storeData.areas[this.areaID].name
      : 'set areaName';

    window.document.title = this.areaName + ' ' + this.storeData.name;

    this.revListSortByDate();
    this.calculateSheets();
  }

  private getDataFromLocalBackup() {
    const localSt = this.getLocalSt('bar Kicks_');

    // console.log(localSt);

    // return;
    const data: any = {};
    // with Local Storage
    this.menuList = localSt.menuList || this.menuList;
    this.revData = localSt.revData || this.revData;
    this.revList = this.returnList('revData');
    this.cashData = localSt.cashData || this.cashData;
    this.cashList = this.returnList('cashData');
    this.taraData = localSt.taraData;
    this.taraList = this.returnList('taraData');

    data.menuList = this.menuList;
    data.revData = this.revData;
    data.cashData = this.cashData;
    data.taraData = this.taraData;
    data.storeData = {
      name: 'bar Kicks',
      areas: [{ name: 'Old bar' }, { name: 'New bar' }]
    };
    // this.DbData.set(JSON.parse(JSON.stringify(data))).catch(function(error) {
    //   console.error(error);
    // });
  }

  public fStore(name = 'revData'): void {
    // let json: string;

    this.calculateSheets();
    const data: any = {};

    switch (name) {
      case 'revData':
        data.revData = JSON.parse(JSON.stringify(this.revData)) || [];
        this.DbRevData.update(JSON.parse(JSON.stringify(data))).catch(error => {
          console.error(error);
        });
        return;
        break;
      case 'cashData':
        data.cashData = this.cashData || [];

        break;
      case 'taraData':
        data.taraData = this.taraData || [];
        break;
      default:
        data[name] = this[name] || [];
    }
    // console.log(data);

    this.DbData.update(JSON.parse(JSON.stringify(data))).catch(error => {
      console.error(error);
    });
    this.containerName = '';
  }

  public localStore(): void {
    let json: string;

    // this.calculateSheets();

    const dataList = [
      'menuList',
      'revData',
      'sumSheetView',
      'taraData',
      'cashData',
      'storeData'
    ];
    const sumData = {};
    this.containerName = '';
    dataList.forEach((name, idx) => {
      sumData[name] = JSON.parse(JSON.stringify(this[name]));

      // }
    });
    json = JSON.stringify(sumData);
    localStorage.setItem(
      this.storeData.name + '_', // + this.areaID
      json
      // CryptoJS.AES.encrypt(json, "secret key 123").toString()
    );
  }

  public newDayTab(date): boolean {
    const datestring = this.getNewDate(date);
    this.ably.publish('newDayTab', { timestamp: Date.now() });

    if (this.revKeys.indexOf(datestring) == -1) {
      // this.revKeys.push(datestring);

      this.revData[this.areaID].data[datestring] = [];

      this.revSheetView[datestring] = {};

      this.revListSortByDate();
      this.calculateSheets();
      this.fStore();
    } else {
      // show calendar controll
      return false;
    }
    // this.fStore();
    return true;
  }

  public addMenuTab() {
    const tab = {
      name: 'newTab',
      data: []
    };
    this.menuList.push(tab);
    // this.fStore("menuList");
  }

  public removeMenuTab() {
    if (this.revList) {
      this.menuList.splice(this.tabSelectedIdx, 1);
    }
  }

  public addCashTab() {
    const tab = {
      name: 'newTab',
      data: []
    };
    // this.cashList.push(tab);
  }

  private copyLastDayRevData() {
    const lastDate = this.revKeys.slice(-1)[0];

    const tempList = [];
    this.revList[lastDate].forEach(revItem => {
      const item = this.taraList.filter(taraItem => {
        return taraItem.id == revItem.id;
      })[0];

      if (item) {
        item.startRev = JSON.parse(JSON.stringify(revItem.ends));
        item.netStart = JSON.parse(JSON.stringify(item.end));
      }
    });
  }

  public removeRevSheet(date) {
    if (!date) {
      date = this.activeDate;
    }

    if (this.revList[date]) {
      delete this.revList[date];
    }
    // console.log(Object.keys(this.revList)[this.activeDateIdx]);

    // if tab is last move active focus on last after deletion
    if (!Object.keys(this.revList)[this.activeDateIdx]) {
      this.activeTabIdx = this.activeTabIdx - 1;
    }
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

    const rev = {};
    this.revKeys.forEach(day => {
      this.cashSummary[day] = [];
      this.cashSheetView[day] = {};

      rev[day] = this.revList[day];
      this.revSheetView[day] = {};
    });
    // console.log(this.taraList[0].startRev);
    this.revList = rev;
    this.revData[this.areaID].data = this.revList;
    this.cashData[this.areaID].data = {};

    this.fStore();
    this.fStore('taraData');
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
    this.tempSummary['sumTotal'] = 0;
    // this.tempCashSummary["sumTotal"] = 0;
    this.revKeys.forEach(date => {
      this.cashSheetView['sum'] = {};
      this.calcDailyCashSheets(date);
      this.calculateRevSheet(date);
    });
  }

  public calcDailyCashSheets(date) {
    this.cashSheetView[date] = {};
    this.cashTabSummary[date] = {};
    this.cashSheetSuma[date] = 0;
    this.cashSheetSuma[date] = 0;

    // console.log(date);

    const cashList = this.cashData[this.areaID]
      ? this.cashData[this.areaID].data
      : [];
    // console.log(cashList[date]);
    let tempSuma = 0;
    let tempSum = 0;
    const tempTabSuma = {};
    this.cashItems.forEach((tab, idx) => {
      this.cashTabSummary[date][tab.name] = 0;
      let tempCashSheet: Array<any> = [];
      // var emptyRow = new cashItem(idx, "", 0, 0);
      // tab.data.forEach((cItem, id) => {
      tempCashSheet = [];
      if (cashList[date]) {
        tempSuma = 0;
        tempSum = 0;

        cashList[date].forEach(i => {
          i as cashItem;

          tempSuma += i.suma * 1;
          tempSum += i.sum * 1;

          if (i.tabIdx == idx) {
            tempCashSheet.push(i);
            this.cashTabSummary[date][tab.name] += i.sum * 1;
          }
        });
      } else {
        cashList[date] = [];
        for (let j; j < 4; j++) {
          tempCashSheet.push(new cashItem(idx, '', 0, 0, 0));
        }
      }

      this.cashSheetSuma[date] = tempSuma;
      this.cashSheetSum[date] = tempSum;

      // this.cashSummary[date]["sumTotal"] += Number(item.sum) || 0;

      //  this.cashTabSummary[date][tab.name]["suma"] += i.sum;

      // });

      // let i = tempCashSheet.length;
      // console.log(i);
      // for (i; i < 4; i++) {
      //   tempCashSheet.push(new cashItem(idx, "", 0, 0));
      // }
      // console.log(tempSuma);
      // console.log(this.cashSheetSuma);

      // console.log(tab.name + " " + tempSum);
      this.cashSheetView[date][tab.name] = tempCashSheet;
    });
  }

  public calculateRevSheet(date) {
    // console.log(date);

    this[date + 'Sum'] = 0;
    this.menuList.forEach(tab => {
      if (!this.tempSummary[tab.name]) {
        this.tempSummary[tab.name] = [];
      }

      const tempRev: Array<any> = [];
      const tempTara: Array<any> = [];

      tab.data.forEach((menuItem, id) => {
        const item = JSON.parse(JSON.stringify(menuItem));
        const prevDayIdx = this.revKeys.indexOf(date) - 1;

        const itm = this.revItemCalculator(item, date, prevDayIdx);
        if (itm) {
          tempRev[id] = itm;

          this[date + 'Sum'] += Number(itm.sum) || 0;

          this.tempSummary[tab.name][id] = this.sumProp(
            this.tempSummary[tab.name][id],
            itm
          );
          if (date == this.revKeys[this.revKeys.length - 1]) {
            tempTara[id] = this.taraItemSums(
              this.tempSummary[tab.name][id],
              itm
            );
          }

          // console.log(tempTara[id].netStart);

          this.tempSummary.sumTotal += Number(itm.sum) || 0;
        }
        // end each tab
      });
      this.revSheetView[date][tab.name] = tempRev;

      if (date === this.revKeys[this.revKeys.length - 1]) {
        this.taraSheetView[tab.name] = tempTara;
      }
    });
    this.sumSheetView = this.tempSummary;
    this.sumSheetView.sumTotal =
      Math.round(this.sumSheetView.sumTotal * 1000) / 1000;

    return this[date];
  }

  private sumProp(a, b) {
    if (!a) {
      return b;
    }
    const obj = {};
    Object.keys(a).map(function (x) {
      switch (x) {
        case 'id':
        case 'name':
        case 'starts':
        case 'price':
        case 'qtyBruto':
        case 'qty':
        case 'cost':
        case 'round':
          obj[x] = a[x];
          break;
        case 'ends':
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
    const menuItem = JSON.parse(JSON.stringify(menuItm));
    const revItem = JSON.parse(JSON.stringify(itm));

    let item = this.taraList.filter(i => {
      // [this.areaID].data.
      return i.id == menuItem.id;
    })[0];

    if (!item) {
      item = new taraItem(menuItem.id);
      this.taraList.push(item); // [this.areaID].data
    }
    // item.start = item.start || item.netStart;
    // var item = taraItem[this.areaID].data;

    item.net =
      Math.round((((item.bruto1 as number) - item.tara1) as number) * 1000) /
      1000;
    if (!item.net) {
      item.net =
        Math.round((((item.bruto as number) - item.tara) / 0.7) * 1000) / 1000;
    }
    item.net = item.net || 1;
    // 1;
    // console.log(item.net);

    if (item.net <= 0) {
      item.net = 1;
    }
    item.end = (revItem.ends -
      (item.taraQty as number) * item.tara -
      (item.taraQty1 as number) * item.tara1) as number;

    item.end =
      (Math.round((item.end * 100) / item.net) as number) / 100 +
      ((item.inStore as number) || 0);

    item.name = menuItem.name;
    item.netDiff =
      Math.round(
        (((((item.start || item.netStart) as number) + item.buy) as number) -
          item.end) *
        100
      ) / 100;
    // if (item.net != 1)

    // if (query) item.start = item.end;
    // console.log(menuItem);
    item.diff =
      Math.round(
        (menuItem.roundSold / menuItem.qtyBruto - (item.netDiff || 0)) * 100
      ) / 100;
    item.diffCash =
      Math.round(item.diff * menuItem.qtyBruto * menuItem.price * 100) / 100;
    return item;
  }

  private revItemCalculator(menuItem, date, prevDayIdx) {
    const prevDay = this.revKeys[prevDayIdx];
    // console.log(this.revList);

    let revItem = this.revList[date].filter(i => {
      return i.id == menuItem.id;
    })[0];

    if (!revItem) {
      revItem = new reviziaItem(menuItem.id);
      this.revList[date].push(revItem);
    }
    let prevEnds;
    if (prevDayIdx < 0) {
      prevEnds = this.taraList.filter(i => {
        return i.id == menuItem.id;
      })[0];
      prevEnds = prevEnds ? prevEnds.startRev : 0;
    } else {
      prevEnds =
        this.revList[prevDay].filter(i => {
          return i.id == menuItem.id;
        })[0].ends || 0;
    }

    revItem.starts = prevEnds || 0;
    let item = Object.assign(revItem, menuItem);
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
    let d = date || new Date();
    if (d.getHours() < 9 && !date) {
      d = new Date(d.getTime() - (d.getHours() + 1) * 60 * 60 * 1000);
    }
    const datestring =
      d.getFullYear() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + d.getDate().toString()).slice(-2);
    return datestring;
  }

  // To Do
  private changeDate() {
    // console.log("change");
  }
}
