import { Injectable } from "@angular/core";
import { interval } from "rxjs";
// import { Item, User, Table } from "../models/item.model";
// import { OpenTab, OpenTabs, Order, CopyA, CopyO } from "../models/tab.model";
// import * as CryptoJS from "crypto-js";
import { _localeFactory } from "@angular/core/src/application_module";
import { DataService } from "./data.service";
// const MENU;
// let log = console.log;
@Injectable()
export class RevService {
  //  view;
  menuList = [
    {
      name: "tab",
      data: [
        {
          id: "21209..",
          name: "Кафе",
          cost: 56,
          qty: 0.007,
          price: 2.2,
          round: 1
        },
        {
          id: "21210",
          name: "Безкофеин",
          cost: 0.5,
          qty: 1,
          price: 2.4,
          round: 1
        },
        {
          id: "21216..",
          name: "Нес кафе",
          cost: 50,
          qty: 2,
          price: 1.2,
          round: 1
        },
        { id: "21219", name: "Какао", cost: 40, qty: 5, price: 1.2, round: 1 },
        {
          id: "21197..",
          name: "Мляко",
          cost: 1.7,
          qty: 0.2,
          price: 1.2,
          round: 0.5
        },
        { id: "21201", name: "LaFesta", cost: 1, qty: 1, price: 2.5, round: 1 },
        { id: "21205..", name: "Чай", cost: 0.15, qty: 1, price: 2, round: 1 },
        { id: "21203", name: "Мед", cost: 0.2, qty: 1, price: 0.5, round: 1 },
        {
          id: "21202",
          name: "Сметана",
          cost: 0.2,
          qty: 1,
          price: 0.5,
          round: 1
        },
        {
          id: "21232",
          name: "Мин. Вода 0.5",
          cost: 0.5,
          qty: 1,
          price: 1.8,
          round: 1
        },
        {
          id: "21225",
          name: "Сода 0.5",
          cost: 0.55,
          qty: 1,
          price: 1.8,
          round: 1
        },
        {
          id: "21221..",
          name: "Студен чай",
          cost: 1.1,
          qty: 1,
          price: 3.5,
          round: 1
        },
        {
          id: "21236..",
          name: "Сок",
          cost: 2.5,
          qty: 0.2,
          price: 2,
          round: 0.5
        },
        {
          id: "21228..",
          name: "Кутийка",
          cost: 0.8,
          qty: 1,
          price: 2.2,
          round: 1
        },
        { id: "21235", name: "Shark", cost: 1.4, qty: 1, price: 4.5, round: 1 },
        { id: "21234", name: "Red Bull", cost: 2, qty: 1, price: 5, round: 1 },
        { id: "6", name: "Ginger beer", cost: 3, qty: 1, price: 4, round: 1 },
        {
          id: "21257, 22724",
          name: "Staropramen",
          cost: 1.13,
          qty: 1,
          price: 3.5,
          round: 1
        },
        {
          id: "21256",
          name: "Stela artois",
          cost: 1.3,
          qty: 1,
          price: 3,
          round: 1
        },
        {
          id: "22041",
          name: "Primator ALL",
          cost: 2,
          qty: 1,
          price: 9,
          round: 1
        },
        {
          id: "5",
          name: "Приматор ТЪЩА",
          cost: 2.7,
          qty: 1,
          price: 6,
          round: 1
        },
        {
          id: "21265",
          name: "Bernard Swing",
          cost: 3.1,
          qty: 1,
          price: 6,
          round: 1
        },
        {
          id: "21268",
          name: "Диво пиво",
          cost: 2.3,
          qty: 1,
          price: 6,
          round: 1
        },
        {
          id: "21258, 21262",
          name: "Heinecken; Leffe",
          cost: 1.8,
          qty: 1,
          price: 3.8,
          round: 1
        },
        {
          id: "21266, 22152",
          name: "Regent; Bernard svetlo",
          cost: 2.1,
          qty: 1,
          price: 5,
          round: 1
        },
        { id: "21264", name: "Corona", cost: 2.35, qty: 1, price: 5, round: 1 },
        {
          id: "21255",
          name: "Столично",
          cost: 1.4,
          qty: 1,
          price: 4,
          round: 1
        },
        {
          id: "21260, 21270",
          name: "G 330; Kilkenny",
          cost: 2.5,
          qty: 1,
          price: 5,
          round: 1
        },
        { id: "21261", name: "G 440", cost: 3.1, qty: 1, price: 6, round: 1 },
        {
          id: "21772",
          name: "Schoeffer grapefruit",
          cost: 1.4,
          qty: 1,
          price: 4,
          round: 1
        },
        {
          id: "21267",
          name: "Claustaller",
          cost: 1.6,
          qty: 1,
          price: 3.5,
          round: 1
        },
        {
          id: "21271",
          name: "Schoefferhofer",
          cost: 2.1,
          qty: 1,
          price: 4.8,
          round: 1
        },
        {
          id: "21361, 21875, 21866",
          name: "Вино бут.",
          cost: 9,
          qty: 0.15,
          price: 5,
          round: 1
        },
        {
          id: "21885, 21364, 21874",
          name: "Вино чаши",
          cost: 3.6,
          qty: 0.15,
          price: 5,
          round: 1
        },
        {
          id: "4",
          name: "Вино бокс чаша",
          cost: 12,
          qty: 0.15,
          price: 6.5,
          round: 1
        },
        {
          id: "24567",
          name: "Savoy джин",
          cost: 10,
          qty: 0.05,
          price: 2.2,
          round: 0.5
        },
        {
          id: "21354, 21344",
          name: "Коняк; Ракия БГ",
          cost: 20,
          qty: 0.05,
          price: 3.5,
          round: 0.5
        },
        {
          id: "3",
          name: "Ракия Грапа",
          cost: 20,
          qty: 44,
          price: 3.5,
          round: 0.5
        },
        {
          id: "21294",
          name: "Мента",
          cost: 8,
          qty: 0.05,
          price: 2.2,
          round: 0.5
        },
        {
          id: "21275..",
          name: "Smirnoff",
          cost: 22,
          qty: 44,
          price: 4.4,
          round: 0.5
        },
        {
          id: "21278..",
          name: "Absolut",
          cost: 24,
          qty: 44,
          price: 4.4,
          round: 0.5
        },
        {
          id: "21277",
          name: "Finlandia",
          cost: 21,
          qty: 44,
          price: 4.4,
          round: 0.5
        },
        {
          id: "21283..",
          name: "Sobieski",
          cost: 21,
          qty: 44,
          price: 3.8,
          round: 0.5
        },
        {
          id: "21285",
          name: "Руски Стандарт",
          cost: 22,
          qty: 44,
          price: 4.4,
          round: 0.5
        },
        { id: "2", name: "Reyka", cost: 35, qty: 44, price: 5.5, round: 0.5 },
        {
          id: "21414",
          name: "Житная",
          cost: 11,
          qty: 44,
          price: 2.7,
          round: 0.5
        },
        {
          id: "24553",
          name: "Gordon's",
          cost: 25,
          qty: 44,
          price: 4.5,
          round: 0.5
        },
        {
          id: "24554",
          name: "Tanquery",
          cost: 33,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "24551",
          name: "Beefeater",
          cost: 26,
          qty: 44,
          price: 4.5,
          round: 0.5
        },
        {
          id: "24552",
          name: "Bombay Sapphire",
          cost: 42,
          qty: 44,
          price: 6,
          round: 0.5
        },
        {
          id: "24556",
          name: "Hendrick's",
          cost: 48,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "24569",
          name: "Bulldog",
          cost: 32,
          qty: 44,
          price: 6,
          round: 0.5
        },
        { id: "13673", name: "Просеко", cost: 9, qty: 0.05, price: 1, round: 1 }
      ]
    },

    {
      name: "tab1",
      data: [
        {
          id: "21305",
          name: "Famouse Grouse",
          cost: 30,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21304",
          name: "Johnnie Walker",
          cost: 27,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21323",
          name: "Johnnie 12*",
          cost: 48,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "23556",
          name: "Gentleman Jack",
          cost: null,
          qty: 44,
          price: 10,
          round: 0.5
        },
        {
          id: "21324",
          name: "Skallywag",
          cost: 88,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "21296",
          name: "Jim Beam",
          cost: 21,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21297",
          name: "4 Roses",
          cost: 31,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21298",
          name: "Jack Daniels",
          cost: 42,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "21309",
          name: "Paddy",
          cost: 29,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21306",
          name: "Jameson",
          cost: 30,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21302",
          name: "John Power",
          cost: 41,
          qty: 44,
          price: 6.2,
          round: 0.5
        },
        {
          id: "21307",
          name: "Bushmill's",
          cost: 27,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "21690",
          name: "Glenfiddich",
          cost: 68,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "21409",
          name: "Bush 10*",
          cost: 56,
          qty: 44,
          price: 9,
          round: 0.5
        },
        {
          id: "21325",
          name: "Black Bush ",
          cost: 43,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "21359, 21388, 21389",
          name: "Текила 2.00",
          cost: 25,
          qty: 23,
          price: 2.3,
          round: 1
        },
        {
          id: "21360",
          name: "Текила 100%",
          cost: 25,
          qty: 23,
          price: 3,
          round: 1
        },
        {
          id: "21322",
          name: "Eldor 12",
          cost: 80,
          qty: 44,
          price: 7.5,
          round: 0.5
        },
        {
          id: "21319",
          name: "Eldor 15",
          cost: 95,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "21314",
          name: "Havana",
          cost: 29,
          qty: 44,
          price: 5,
          round: 0.5
        },
        {
          id: "21317",
          name: "Santiago",
          cost: 31,
          qty: 44,
          price: 6,
          round: 0.5
        },
        {
          id: "21318",
          name: "Havana 7*",
          cost: 55,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "23683",
          name: "Brugal",
          cost: 23,
          qty: 44,
          price: 5,
          round: 0.5
        },
        {
          id: "21312",
          name: "Morgan",
          cost: 23,
          qty: 44,
          price: 4.5,
          round: 0.5
        },
        {
          id: "23160",
          name: "El Dor 3*",
          cost: 27,
          qty: 44,
          price: 5,
          round: 0.5
        },
        {
          id: "22040",
          name: "El Dor 5*",
          cost: 31,
          qty: 44,
          price: 6,
          round: 0.5
        },
        {
          id: "21318",
          name: "El Dor 8*",
          cost: 42,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "21771",
          name: "Angostura",
          cost: 69,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "21320",
          name: "S.Jerry",
          cost: 40,
          qty: 44,
          price: 6,
          round: 0.5
        },
        {
          id: "21345",
          name: "Metaxa 5*",
          cost: 27,
          qty: 44,
          price: 4.5,
          round: 0.5
        },
        {
          id: "21346",
          name: "Hennessy",
          cost: 70,
          qty: 44,
          price: 8,
          round: 0.5
        },
        {
          id: "21350",
          name: "Узо",
          cost: 22,
          qty: 44,
          price: 4,
          round: 0.5
        },
        {
          id: "21348, 21349",
          name: "Pernod; Ricard",
          cost: 27,
          qty: 44,
          price: 4.5,
          round: 0.5
        },
        {
          id: "21351",
          name: "Absente Fr.",
          cost: 53,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "21338..",
          name: "Martini",
          cost: 20,
          qty: 44,
          price: 3,
          round: 0.5
        },
        {
          id: "21343",
          name: "Campari",
          cost: 29,
          qty: 44,
          price: 4,
          round: 0.5
        },
        {
          id: "21330",
          name: "Kahlua",
          cost: 33,
          qty: 45,
          price: 5,
          round: 0.2
        },
        {
          id: "21332",
          name: "Malibu",
          cost: 20,
          qty: 44,
          price: 4,
          round: 0.5
        },
        {
          id: "21355",
          name: "Cachasa",
          cost: 28,
          qty: 44,
          price: 4,
          round: 0.5
        },
        {
          id: "21333",
          name: "Bols",
          cost: 25,
          qty: 44,
          price: 4,
          round: 0.2
        },
        {
          id: "21334",
          name: "Гренадин",
          cost: 17,
          qty: 46,
          price: 1.5,
          round: 0.2
        },
        {
          id: "21335",
          name: "Коантро",
          cost: 47,
          qty: 50,
          price: 6,
          round: 0.2
        },
        {
          id: "22725",
          name: "Tia Maria",
          cost: 39,
          qty: 48,
          price: 5,
          round: 0.2
        },
        {
          id: "21329",
          name: "Bailey's",
          cost: 27,
          qty: 48,
          price: 4,
          round: 0.5
        },
        {
          id: "21331, 22039",
          name: "After Shock; Stroh",
          cost: 52,
          qty: 23,
          price: 3.5,
          round: 1
        },
        {
          id: "22986",
          name: "Tatratea",
          cost: 40,
          qty: 44,
          price: 6,
          round: 0.5
        },
        {
          id: "21336",
          name: "Jagermeister",
          cost: 29,
          qty: 23,
          price: 2.5,
          round: 1
        },
        {
          id: "1",
          name: "Aperol",
          cost: 25,
          qty: 44,
          price: 4,
          round: 0.5
        },
        {
          id: "21376",
          name: "фъстък",
          cost: 0.7,
          qty: 1,
          price: 2,
          round: 1
        },
        {
          id: "21374, 21375",
          name: "лешник/бадем",
          cost: 2.5,
          qty: 1,
          price: 4,
          round: 1
        },
        {
          id: "23559",
          name: "Jack Honey",
          cost: 55,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "21390.., 21400.., 22760..",
          name: "коктейли",
          cost: 1,
          qty: 1,
          price: 2,
          round: 1
        },
        {
          id: "21727..",
          name: "Фреш; лимонада",
          cost: 1,
          qty: 1,
          price: 3,
          round: 1
        },
        {
          id: "23554",
          name: "Самбука кафе",
          cost: 22,
          qty: 23,
          price: 3,
          round: 1
        },
        {
          id: "23553",
          name: "Скинос",
          cost: 33,
          qty: 23,
          price: 3,
          round: 1
        },
        {
          id: "23615",
          name: "Maker's Mark",
          cost: 50,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "23649",
          name: "Monkey Shoulder",
          cost: 42,
          qty: 44,
          price: 7,
          round: 0.5
        },
        {
          id: "21308",
          name: "Tullamore Dew",
          cost: 29,
          qty: 44,
          price: 5.2,
          round: 0.5
        },
        {
          id: "23682",
          name: "Naked Grouse",
          cost: 41,
          qty: 44,
          price: 8,
          round: 1
        },
        {
          id: "33",
          name: "ПРОМОЦИЯ Буш + 4 кена",
          cost: 25,
          qty: 1,
          price: 65,
          round: 1
        },
        {
          id: "22",
          name: "ПРОМОЦИЯ Джони Уокър + 4 кена",
          cost: 25,
          qty: 1,
          price: 65,
          round: 1
        }
      ]
    }
  ];

  revizia = {
    prevList: [],
    nextList: []
  };

  //view with rendered column data
  viewSheet = {};
  // store scroll offset for menu tab idx
  tabScrollPos = [];
  tabSelectedIdx: number;

  constructor(data: DataService) {
    this.menuList = this.getLocal("menuList") || this.menuList;
    this.revizia.prevList = this.getLocal("prevList") || this.revizia.prevList;
    this.revizia.nextList = this.getLocal("nextList") || this.revizia.nextList;

    this.viewSheet["prevList"] = {};
    this.viewSheet["nextList"] = {};
    // console.log( this.revizia)
    this.calculateRevSheet("prevList");
    this.calculateRevSheet("nextList");
    // console.log( this.viewSheet)
    data.menu.subscribe(data => {
      if (data["menu"]) {
        // console.log(data)
        this.menuList = data["menu"];

        this.store("menuList");
      } else {
        // MESSAGE - " Not Correct Data Loaded. Continue WITH last Data!"
      }
    });
  }

  public store(name) {
    // log(obj);
    //if(name!="menu") this.calculateSheet(name);

    let json = JSON.stringify(this.revizia[name] || this.menuList);
    localStorage.setItem(
      name,
      json
      // CryptoJS.AES.encrypt(json, "secret key 123").toString()
    );

    this.calculateRevSheet("prevList");
    this.calculateRevSheet("nextList");
  }

  public getLocal(name) {
    if (!localStorage[name]) return 0;
    // console.log(localStorage[name]);
    return JSON.parse(
      // CryptoJS.AES.decrypt(
      localStorage.getItem(name)
      // ,"secret key 123"
      // ).toString(CryptoJS.enc.Utf8)
    );
  }

  public calculateRevSheet(date) {
    this[date + "Sum"] = 0;

    this.menuList.forEach(tab => {
      var tempList: Array<any> = [];
      tab.data.forEach((item, id) => {
        var revItem = this.revizia[date].filter(i => {
          return i.id == item.id;
        })[0];

        var itm = this.revItemCalculator(revItem, item, date);
        if (itm) {
          tempList[id] = itm;
          this[date + "Sum"] += Number(itm.sum) || 0;
          // this.revizia[date][this.revizia[date].indexOf(revItem)] = itm
        }
      });
      this.viewSheet[date][tab.name] = tempList;
      //  console.log( tempList)
    });
    // console.log( this.viewSheet)
    return this[date];
  }

  public revItemCalculator(item, menuItem, date) {
    if (!item) {
      item = {
        id: menuItem.id,
        minus: 0,
        mplus: 0,
        starts: 0,
        ends: 0
      };
      this.revizia[date].push(item);
    }
    var prevDay =
      this.revizia.prevList.filter(i => {
        return i.id == menuItem.id;
      })[0] || {};
    item.starts = prevDay["ends"] || 0;

    item = this.viewItemCalc(item, menuItem);
    // console.log(item);

    return item;
  }

  viewItemCalc(item, menuItem) {
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

    return item;
  }
}
