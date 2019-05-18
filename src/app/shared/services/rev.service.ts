import { Injectable } from "@angular/core";
import { interval } from "rxjs";
// import { Item, User, Table } from "../models/item.model";
// import { OpenTab, OpenTabs, Order, CopyA, CopyO } from "../models/tab.model";
// import * as CryptoJS from "crypto-js";
import { _localeFactory } from "@angular/core/src/application_module";
import { DataService } from "./data.service";

let log = console.log;
@Injectable()
export class RevService {
  sumTotal = 0;
  // items: Item[] = [];
  itemsList = [];
  lastOrders = [];
  sales;
  menu;
  Data;
  areaID = 98;
  qty = 1;
  qtyStr = "1";
  user;
  users;
  // table: Table = new Table();
  tableIdOld;
  listUsers = [];
  cmd = "";

  constructor(private data: DataService) {
    this.menu = this.getS("menu");
    this.data.menu.subscribe(data => {
      if (data["users"]) {
        // this.menu = CopyO(data);
        this.store("menu", data);
      } else {
        // MESSAGE - " Not Correct Data Loaded. Continue WITH last Data!"
      }
      // developer mode auto login
      setTimeout(() => {
        // this.userLogin(123);
        // db.database.ref("bilkova");
        // log(this.menu.items.customers);
        // CryptoJS.AES.encrypt(json, "secret key 123").toString();
        // db.object("/bilkova/data").set(this.menu);
      }, 1500);
    });

    // this.user = new User();
    this.sales = Array.from(this.getS("sales")) || [];
  }

  public store(name, obj) {
    // log(obj);
    let json = JSON.stringify(obj);
    localStorage.setItem(
      name,
      json
      // CryptoJS.AES.encrypt(json, "secret key 123").toString()
    );
  }

  public getS(name) {
    if (!localStorage[name]) return 0;

    return JSON.parse(
      // CryptoJS.AES.decrypt(
      localStorage.getItem(name)
      // ,"secret key 123"
      // ).toString(CryptoJS.enc.Utf8)
    );
  }

  public listUserNames() {
    if (this.user.id) return [];
    else if (this.menu.users) return Object.values(this.menu.users);
    else return [];
  }

  public listMenuItems() {
    if (!this.user.id) return [];
    else if (this.menu.items) return Object.values(this.menu.items);
    else return [];
  }

  public listTables() {
    // console.log(this.menu.tables)
    if (this.menu.tables) return Object.values(this.menu.tables);
    else return [];
  }

  public listCustomers() {
    // console.log(this.menu.tables)
    if (this.menu.customers) return Object.values(this.menu.customers);
    else return [];
  }
}
