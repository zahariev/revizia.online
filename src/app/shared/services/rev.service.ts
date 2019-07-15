import { Injectable } from "@angular/core";
import { interval } from "rxjs";
// import { Item, User, Table } from "../models/item.model";
// import { OpenTab, OpenTabs, Order, CopyA, CopyO } from "../models/tab.model";
// import * as CryptoJS from "crypto-js";
// import { _localeFactory } from "@angular/core/src/application_module";
import { DataService } from "./data.service";
// const MENU;
// let log = console.log;
@Injectable()
export class RevService {
  //  view;
  menuList2 = [
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

  menuList = [{"name":"tab","data":[{"id":"21209..","name":"Кафе","cost":56,"qty":0.007,"price":2.2,"round":1},{"id":"21210","name":"Безкофеин","cost":0.5,"qty":1,"price":2.4,"round":1},{"id":"21216..","name":"Нес кафе","cost":50,"qty":2,"price":1.2,"round":1},{"id":"21219","name":"Какао","cost":40,"qty":5,"price":1.2,"round":1},{"id":"21197..","name":"Мляко","cost":1.7,"qty":0.2,"price":1.2,"round":0.5},{"id":"21201","name":"LaFesta","cost":1,"qty":1,"price":2.5,"round":1},{"id":"21205..","name":"Чай","cost":0.15,"qty":1,"price":2,"round":1},{"id":"21203","name":"Мед","cost":0.2,"qty":1,"price":0.5,"round":1},{"id":"21202","name":"Сметана","cost":0.2,"qty":1,"price":0.5,"round":1},{"id":"21232","name":"Мин. Вода 0.5","cost":0.5,"qty":1,"price":1.8,"round":1},{"id":"21225","name":"Сода 0.5","cost":0.55,"qty":1,"price":1.8,"round":1},{"id":"21221..","name":"Студен чай","cost":1.1,"qty":1,"price":3.5,"round":1},{"id":"21236..","name":"Сок","cost":2.5,"qty":0.2,"price":2,"round":0.5},{"id":"21228..","name":"Кутийка","cost":0.8,"qty":1,"price":2.2,"round":1},{"id":"21235","name":"Shark","cost":1.4,"qty":1,"price":4.5,"round":1},{"id":"21234","name":"Red Bull","cost":2,"qty":1,"price":5,"round":1},{"id":"6","name":"Ginger beer","cost":3,"qty":1,"price":4,"round":1},{"id":"21257, 22724","name":"Staropramen","cost":1.13,"qty":1,"price":3.5,"round":1},{"id":"21256","name":"Stela artois","cost":1.3,"qty":1,"price":3,"round":1},{"id":"22041","name":"Primator ALL","cost":2,"qty":1,"price":9,"round":1},{"id":"5","name":"Приматор ТЪЩА","cost":2.7,"qty":1,"price":6,"round":1},{"id":"21265","name":"Bernard Swing","cost":3.1,"qty":1,"price":6,"round":1},{"id":"21268","name":"Диво пиво","cost":2.3,"qty":1,"price":6,"round":1},{"id":"21258, 21262","name":"Heinecken; Leffe","cost":1.8,"qty":1,"price":3.8,"round":1},{"id":"21266, 22152","name":"Regent; Bernard svetlo","cost":2.1,"qty":1,"price":5,"round":1},{"id":"21264","name":"Corona","cost":2.35,"qty":1,"price":5,"round":1},{"id":"21255","name":"Столично","cost":1.4,"qty":1,"price":4,"round":1},{"id":"21260, 21270","name":"G 330; Kilkenny","cost":2.5,"qty":1,"price":5,"round":1},{"id":"21261","name":"G 440","cost":3.1,"qty":1,"price":6,"round":1},{"id":"21772","name":"Schoeffer grapefruit","cost":1.4,"qty":1,"price":4,"round":1},{"id":"21267","name":"Claustaller","cost":1.6,"qty":1,"price":3.5,"round":1},{"id":"21271","name":"Schoefferhofer","cost":2.1,"qty":1,"price":4.8,"round":1},{"id":"21361, 21875, 21866","name":"Вино бут.","cost":9,"qty":0.15,"price":5,"round":1},{"id":"21885, 21364, 21874","name":"Вино чаши","cost":3.6,"qty":0.15,"price":5,"round":1},{"id":"4","name":"Вино бокс чаша","cost":12,"qty":0.15,"price":6.5,"round":1},{"id":"24567","name":"Savoy джин","cost":10,"qty":0.05,"price":2.2,"round":0.5},{"id":"21354, 21344","name":"Коняк; Ракия БГ","cost":20,"qty":0.05,"price":3.5,"round":0.5},{"id":"3","name":"Ракия Грапа","cost":20,"qty":0.05,"price":3.5,"round":0.5},{"id":"21294","name":"Мента","cost":8,"qty":0.05,"price":2.2,"round":0.5},{"id":"21275..","name":"Smirnoff","cost":22,"qty":0.05,"price":4.4,"round":0.5},{"id":"21278..","name":"Absolut","cost":24,"qty":0.05,"price":4.4,"round":0.5},{"id":"21277","name":"Finlandia","cost":21,"qty":0.05,"price":4.4,"round":0.5},{"id":"21283..","name":"Sobieski","cost":21,"qty":0.05,"price":3.8,"round":0.5},{"id":"21285","name":"Руски Стандарт","cost":22,"qty":0.05,"price":4.4,"round":0.5},{"id":"2","name":"Reyka","cost":35,"qty":0.05,"price":5.5,"round":0.5},{"id":"21414","name":"Житная","cost":11,"qty":0.05,"price":2.7,"round":0.5},{"id":"24553","name":"Gordon's","cost":25,"qty":0.05,"price":4.5,"round":0.5},{"id":"24554","name":"Tanquery","cost":33,"qty":0.05,"price":5.2,"round":0.5},{"id":"24551","name":"Beefeater","cost":26,"qty":0.05,"price":4.5,"round":0.5},{"id":"24552","name":"Bombay Sapphire","cost":42,"qty":0.05,"price":6,"round":0.5},{"id":"24556","name":"Hendrick's","cost":48,"qty":0.05,"price":7,"round":0.5},{"id":"24569","name":"Bulldog","cost":32,"qty":0.05,"price":6,"round":0.5},{"id":"13673","name":"Просеко","cost":9,"qty":0.05,"price":1,"round":1}]},{"name":"tab1","data":[{"id":"21305","name":"Famouse Grouse","cost":30,"qty":44,"price":5.2,"round":0.5},{"id":"21304","name":"Johnnie Walker","cost":27,"qty":44,"price":5.2,"round":0.5},{"id":"21323","name":"Johnnie 12*","cost":48,"qty":44,"price":8,"round":0.5},{"id":"23556","name":"Gentleman Jack","cost":null,"qty":44,"price":10,"round":0.5},{"id":"21324","name":"Skallywag","cost":88,"qty":44,"price":8,"round":0.5},{"id":"21296","name":"Jim Beam","cost":21,"qty":44,"price":5.2,"round":0.5},{"id":"21297","name":"4 Roses","cost":31,"qty":44,"price":5.2,"round":0.5},{"id":"21298","name":"Jack Daniels","cost":42,"qty":44,"price":7,"round":0.5},{"id":"21309","name":"Paddy","cost":29,"qty":44,"price":5.2,"round":0.5},{"id":"21306","name":"Jameson","cost":30,"qty":44,"price":5.2,"round":0.5},{"id":"21302","name":"John Power","cost":41,"qty":44,"price":6.2,"round":0.5},{"id":"21307","name":"Bushmill's","cost":27,"qty":44,"price":5.2,"round":0.5},{"id":"21690","name":"Glenfiddich","cost":68,"qty":44,"price":8,"round":0.5},{"id":"21409","name":"Bush 10*","cost":56,"qty":44,"price":9,"round":0.5},{"id":"21325","name":"Black Bush ","cost":43,"qty":44,"price":8,"round":0.5},{"id":"21359, 21388, 21389","name":"Текила 2.00","cost":25,"qty":23,"price":2.3,"round":1},{"id":"21360","name":"Текила 100%","cost":25,"qty":23,"price":3,"round":1},{"id":"21322","name":"Eldor 12","cost":80,"qty":44,"price":7.5,"round":0.5},{"id":"21319","name":"Eldor 15","cost":95,"qty":44,"price":8,"round":0.5},{"id":"21314","name":"Havana","cost":29,"qty":44,"price":5,"round":0.5},{"id":"21317","name":"Santiago","cost":31,"qty":44,"price":6,"round":0.5},{"id":"21318","name":"Havana 7*","cost":55,"qty":44,"price":7,"round":0.5},{"id":"23683","name":"Brugal","cost":23,"qty":44,"price":5,"round":0.5},{"id":"21312","name":"Morgan","cost":23,"qty":44,"price":4.5,"round":0.5},{"id":"23160","name":"El Dor 3*","cost":27,"qty":44,"price":5,"round":0.5},{"id":"22040","name":"El Dor 5*","cost":31,"qty":44,"price":6,"round":0.5},{"id":"21318","name":"El Dor 8*","cost":42,"qty":44,"price":7,"round":0.5},{"id":"21771","name":"Angostura","cost":69,"qty":44,"price":8,"round":0.5},{"id":"21320","name":"S.Jerry","cost":40,"qty":44,"price":6,"round":0.5},{"id":"21345","name":"Metaxa 5*","cost":27,"qty":44,"price":4.5,"round":0.5},{"id":"21346","name":"Hennessy","cost":70,"qty":44,"price":8,"round":0.5},{"id":"21350","name":"Узо","cost":22,"qty":44,"price":4,"round":0.5},{"id":"21348, 21349","name":"Pernod; Ricard","cost":27,"qty":44,"price":4.5,"round":0.5},{"id":"21351","name":"Absente Fr.","cost":53,"qty":44,"price":7,"round":0.5},{"id":"21338..","name":"Martini","cost":20,"qty":44,"price":3,"round":0.5},{"id":"21343","name":"Campari","cost":29,"qty":44,"price":4,"round":0.5},{"id":"21330","name":"Kahlua","cost":33,"qty":45,"price":5,"round":0.2},{"id":"21332","name":"Malibu","cost":20,"qty":44,"price":4,"round":0.5},{"id":"21355","name":"Cachasa","cost":28,"qty":44,"price":4,"round":0.5},{"id":"21333","name":"Bols","cost":25,"qty":44,"price":4,"round":0.2},{"id":"21334","name":"Гренадин","cost":17,"qty":46,"price":1.5,"round":0.2},{"id":"21335","name":"Коантро","cost":47,"qty":50,"price":6,"round":0.2},{"id":"22725","name":"Tia Maria","cost":39,"qty":48,"price":5,"round":0.2},{"id":"21329","name":"Bailey's","cost":27,"qty":48,"price":4,"round":0.5},{"id":"21331, 22039","name":"After Shock; Stroh","cost":52,"qty":23,"price":3.5,"round":1},{"id":"22986","name":"Tatratea","cost":40,"qty":44,"price":6,"round":0.5},{"id":"21336","name":"Jagermeister","cost":29,"qty":23,"price":2.5,"round":1},{"id":"1","name":"Aperol","cost":25,"qty":44,"price":4,"round":0.5},{"id":"21376","name":"фъстък","cost":0.7,"qty":1,"price":2,"round":1},{"id":"21374, 21375","name":"лешник/бадем","cost":2.5,"qty":1,"price":4,"round":1},{"id":"23559","name":"Jack Honey","cost":55,"qty":44,"price":7,"round":0.5},{"id":"21390.., 21400.., 22760..","name":"коктейли","cost":1,"qty":1,"price":2,"round":1},{"id":"21727..","name":"Фреш; лимонада","cost":1,"qty":1,"price":3,"round":1},{"id":"23554","name":"Самбука кафе","cost":22,"qty":23,"price":3,"round":1},{"id":"23553","name":"Скинос","cost":33,"qty":23,"price":3,"round":1},{"id":"23615","name":"Maker's Mark","cost":50,"qty":44,"price":7,"round":0.5},{"id":"23649","name":"Monkey Shoulder","cost":42,"qty":44,"price":7,"round":0.5},{"id":"21308","name":"Tullamore Dew","cost":29,"qty":44,"price":5.2,"round":0.5},{"id":"23682","name":"Naked Grouse","cost":41,"qty":44,"price":8,"round":1},{"id":"33","name":"ПРОМОЦИЯ Буш + 4 кена","cost":25,"qty":1,"price":65,"round":1},{"id":"22","name":"ПРОМОЦИЯ Джони Уокър + 4 кена","cost":25,"qty":1,"price":65,"round":1}]}];

  taraList = [];

  revData = {
    "2019-06-24": [{"id":"21209..","minus":0,"mplus":0,"starts":1.1,"ends":1.1,"diff":0,"qtySold":0,"price":2.2,"name":"Кафе","roundSold":0,"sum":0},{"id":"21210","minus":0,"mplus":0,"starts":10,"ends":10,"diff":0,"qtySold":0,"price":2.4,"name":"Безкофеин","roundSold":0,"sum":0},{"id":"21216..","minus":0,"mplus":0,"starts":0.18,"ends":0.18,"diff":0,"qtySold":0,"price":1.2,"name":"Нес кафе","roundSold":0,"sum":0},{"id":"21219","minus":0,"mplus":0,"starts":0.11,"ends":0.11,"diff":0,"qtySold":0,"price":1.2,"name":"Какао","roundSold":0,"sum":0},{"id":"21197..","minus":0,"mplus":0,"starts":2.1,"ends":2.1,"diff":0,"qtySold":0,"price":1.2,"name":"Мляко","roundSold":0,"sum":0},{"id":"21201","minus":0,"mplus":0,"starts":12,"ends":12,"diff":0,"qtySold":0,"price":2.5,"name":"LaFesta","roundSold":0,"sum":0},{"id":"21205..","minus":0,"mplus":0,"starts":23,"ends":23,"diff":0,"qtySold":0,"price":2,"name":"Чай","roundSold":0,"sum":0},{"id":"21203","minus":0,"mplus":0,"starts":14,"ends":14,"diff":0,"qtySold":0,"price":0.5,"name":"Мед","roundSold":0,"sum":0},{"id":"21202","minus":0,"mplus":0,"starts":20,"ends":20,"diff":0,"qtySold":0,"price":0.5,"name":"Сметана","roundSold":0,"sum":0},{"id":"21232","minus":0,"mplus":0,"starts":45,"ends":45,"diff":0,"qtySold":0,"price":1.8,"name":"Мин. Вода 0.5","roundSold":0,"sum":0},{"id":"21225","minus":0,"mplus":0,"starts":43,"ends":43,"diff":0,"qtySold":0,"price":1.8,"name":"Сода 0.5","roundSold":0,"sum":0},{"id":"21221..","minus":0,"mplus":0,"starts":2,"ends":2,"diff":0,"qtySold":0,"price":3.5,"name":"Студен чай","roundSold":0,"sum":0},{"id":"21236..","minus":0,"mplus":0,"starts":45,"ends":45,"diff":0,"qtySold":0,"price":2,"name":"Сок","roundSold":0,"sum":0},{"id":"21228..","minus":0,"mplus":0,"starts":123,"ends":123,"diff":0,"qtySold":0,"price":2.2,"name":"Кутийка","roundSold":0,"sum":0},{"id":"21235","minus":0,"mplus":0,"starts":15,"ends":15,"diff":0,"qtySold":0,"price":4.5,"name":"Shark","roundSold":0,"sum":0},{"id":"21234","minus":0,"mplus":0,"starts":10,"ends":10,"diff":0,"qtySold":0,"price":5,"name":"Red Bull","roundSold":0,"sum":0},{"id":"6","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":4,"name":"Ginger beer","roundSold":0,"sum":0},{"id":"21257, 22724","minus":0,"mplus":0,"starts":70,"ends":70,"diff":0,"qtySold":0,"price":3.5,"name":"Staropramen","roundSold":0,"sum":0},{"id":"21256","minus":0,"mplus":0,"starts":35,"ends":35,"diff":0,"qtySold":0,"price":3,"name":"Stela artois","roundSold":0,"sum":0},{"id":"22041","minus":0,"mplus":0,"starts":8,"ends":8,"diff":0,"qtySold":0,"price":9,"name":"Primator ALL","roundSold":0,"sum":0},{"id":"5","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":6,"name":"Приматор ТЪЩА","roundSold":0,"sum":0},{"id":"21265","minus":0,"mplus":0,"starts":4,"ends":4,"diff":0,"qtySold":0,"price":6,"name":"Bernard Swing","roundSold":0,"sum":0},{"id":"21268","minus":0,"mplus":0,"starts":20,"ends":20,"diff":0,"qtySold":0,"price":6,"name":"Диво пиво","roundSold":0,"sum":0},{"id":"21258, 21262","minus":0,"mplus":0,"starts":23,"ends":23,"diff":0,"qtySold":0,"price":3.8,"name":"Heinecken; Leffe","roundSold":0,"sum":0},{"id":"21266, 22152","minus":0,"mplus":0,"starts":44,"ends":44,"diff":0,"qtySold":0,"price":5,"name":"Regent; Bernard svetlo","roundSold":0,"sum":0},{"id":"21264","minus":0,"mplus":0,"starts":12,"ends":12,"diff":0,"qtySold":0,"price":5,"name":"Corona","roundSold":0,"sum":0},{"id":"21255","minus":0,"mplus":0,"starts":11,"ends":11,"diff":0,"qtySold":0,"price":4,"name":"Столично","roundSold":0,"sum":0},{"id":"21260, 21270","minus":0,"mplus":0,"starts":4,"ends":4,"diff":0,"qtySold":0,"price":5,"name":"G 330; Kilkenny","roundSold":0,"sum":0},{"id":"21261","minus":0,"mplus":0,"starts":3,"ends":3,"diff":0,"qtySold":0,"price":6,"name":"G 440","roundSold":0,"sum":0},{"id":"21772","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":4,"name":"Schoeffer grapefruit","roundSold":0,"sum":0},{"id":"21267","minus":0,"mplus":0,"starts":6,"ends":6,"diff":0,"qtySold":0,"price":3.5,"name":"Claustaller","roundSold":0,"sum":0},{"id":"21271","minus":0,"mplus":0,"starts":12,"ends":12,"diff":0,"qtySold":0,"price":4.8,"name":"Schoefferhofer","roundSold":0,"sum":0},{"id":"21361, 21875, 21866","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":5,"name":"Вино бут.","roundSold":0,"sum":0},{"id":"21885, 21364, 21874","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Вино чаши","roundSold":0,"sum":0},{"id":"4","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6.5,"name":"Вино бокс чаша","roundSold":0,"sum":0},{"id":"24567","minus":0,"mplus":0,"starts":3,"ends":3,"diff":0,"qtySold":0,"price":2.2,"name":"Savoy джин","roundSold":0,"sum":0},{"id":"21354, 21344","minus":0,"mplus":0,"starts":0.7,"ends":0.7,"diff":0,"qtySold":0,"price":3.5,"name":"Коняк; Ракия БГ","roundSold":0,"sum":0},{"id":"3","minus":0,"mplus":0,"starts":0.2,"ends":0.2,"diff":0,"qtySold":0,"price":3.5,"name":"Ракия Грапа","roundSold":0,"sum":0},{"id":"21294","minus":0,"mplus":0,"starts":0.75,"ends":0.75,"diff":0,"qtySold":0,"price":2.2,"name":"Мента","roundSold":0,"sum":0},{"id":"21275..","minus":0,"mplus":0,"starts":1100,"ends":1.1,"diff":0,"qtySold":0,"price":4.4,"name":"Smirnoff","roundSold":0,"sum":0},{"id":"21278..","minus":0,"mplus":0,"starts":0.85,"ends":0.85,"diff":0,"qtySold":0,"price":4.4,"name":"Absolut","roundSold":0,"sum":0},{"id":"21277","minus":0,"mplus":0,"starts":1.45,"ends":1.45,"diff":0,"qtySold":0,"price":4.4,"name":"Finlandia","roundSold":0,"sum":0},{"id":"21283..","minus":0,"mplus":0,"starts":2,"ends":2,"diff":0,"qtySold":0,"price":3.8,"name":"Sobieski","roundSold":0,"sum":0},{"id":"21285","minus":0,"mplus":0,"starts":1.45,"ends":1.45,"diff":0,"qtySold":0,"price":4.4,"name":"Руски Стандарт","roundSold":0,"sum":0},{"id":"2","minus":0,"mplus":0,"starts":2.1,"ends":2.1,"diff":0,"qtySold":0,"price":5.5,"name":"Reyka","roundSold":0,"sum":0},{"id":"21414","minus":0,"mplus":0,"starts":1.5,"ends":1.5,"diff":0,"qtySold":0,"price":2.7,"name":"Житная","roundSold":0,"sum":0},{"id":"24553","minus":0,"mplus":0,"starts":0.85,"ends":0.85,"diff":0,"qtySold":0,"price":4.5,"name":"Gordon's","roundSold":0,"sum":0},{"id":"24554","minus":0,"mplus":0,"starts":0.45,"ends":0.45,"diff":0,"qtySold":0,"price":5.2,"name":"Tanquery","roundSold":0,"sum":0},{"id":"24551","minus":0,"mplus":0,"starts":0.5,"ends":0.5,"diff":0,"qtySold":0,"price":4.5,"name":"Beefeater","roundSold":0,"sum":0},{"id":"24552","minus":0,"mplus":0,"starts":0.2,"ends":0.2,"diff":0,"qtySold":0,"price":6,"name":"Bombay Sapphire","roundSold":0,"sum":0},{"id":"24556","minus":0,"mplus":0,"starts":0.9,"ends":0.9,"diff":0,"qtySold":0,"price":7,"name":"Hendrick's","roundSold":0,"sum":0},{"id":"24569","minus":0,"mplus":0,"starts":1,"ends":1,"diff":0,"qtySold":0,"price":6,"name":"Bulldog","roundSold":0,"sum":0},{"id":"13673","minus":0,"mplus":0,"starts":2,"ends":2,"diff":0,"qtySold":0,"price":1,"name":"Просеко","roundSold":0,"sum":0},{"id":"21305","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Famouse Grouse","roundSold":0,"sum":0},{"id":"21304","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Johnnie Walker","roundSold":0,"sum":0},{"id":"21323","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Johnnie 12*","roundSold":0,"sum":0},{"id":"23556","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":10,"name":"Gentleman Jack","roundSold":0,"sum":0},{"id":"21324","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Skallywag","roundSold":0,"sum":0},{"id":"21296","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Jim Beam","roundSold":0,"sum":0},{"id":"21297","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"4 Roses","roundSold":0,"sum":0},{"id":"21298","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Jack Daniels","roundSold":0,"sum":0},{"id":"21309","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Paddy","roundSold":0,"sum":0},{"id":"21306","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Jameson","roundSold":0,"sum":0},{"id":"21302","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6.2,"name":"John Power","roundSold":0,"sum":0},{"id":"21307","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Bushmill's","roundSold":0,"sum":0},{"id":"21690","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Glenfiddich","roundSold":0,"sum":0},{"id":"21409","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":9,"name":"Bush 10*","roundSold":0,"sum":0},{"id":"21325","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Black Bush ","roundSold":0,"sum":0},{"id":"21359, 21388, 21389","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.3,"name":"Текила 2.00","roundSold":0,"sum":0},{"id":"21360","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Текила 100%","roundSold":0,"sum":0},{"id":"21322","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7.5,"name":"Eldor 12","roundSold":0,"sum":0},{"id":"21319","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Eldor 15","roundSold":0,"sum":0},{"id":"21314","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Havana","roundSold":0,"sum":0},{"id":"21317","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Santiago","roundSold":0,"sum":0},{"id":"21318","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"El Dor 8*","roundSold":0,"sum":0},{"id":"23683","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Brugal","roundSold":0,"sum":0},{"id":"21312","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Morgan","roundSold":0,"sum":0},{"id":"23160","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"El Dor 3*","roundSold":0,"sum":0},{"id":"22040","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"El Dor 5*","roundSold":0,"sum":0},{"id":"21771","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Angostura","roundSold":0,"sum":0},{"id":"21320","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"S.Jerry","roundSold":0,"sum":0},{"id":"21345","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Metaxa 5*","roundSold":0,"sum":0},{"id":"21346","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Hennessy","roundSold":0,"sum":0},{"id":"21350","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Узо","roundSold":0,"sum":0},{"id":"21348, 21349","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Pernod; Ricard","roundSold":0,"sum":0},{"id":"21351","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Absente Fr.","roundSold":0,"sum":0},{"id":"21338..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Martini","roundSold":0,"sum":0},{"id":"21343","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Campari","roundSold":0,"sum":0},{"id":"21330","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Kahlua","roundSold":0,"sum":0},{"id":"21332","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Malibu","roundSold":0,"sum":0},{"id":"21355","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Cachasa","roundSold":0,"sum":0},{"id":"21333","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Bols","roundSold":0,"sum":0},{"id":"21334","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":1.5,"name":"Гренадин","roundSold":0,"sum":0},{"id":"21335","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Коантро","roundSold":0,"sum":0},{"id":"22725","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Tia Maria","roundSold":0,"sum":0},{"id":"21329","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Bailey's","roundSold":0,"sum":0},{"id":"21331, 22039","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.5,"name":"After Shock; Stroh","roundSold":0,"sum":0},{"id":"22986","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Tatratea","roundSold":0,"sum":0},{"id":"21336","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.5,"name":"Jagermeister","roundSold":0,"sum":0},{"id":"1","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Aperol","roundSold":0,"sum":0},{"id":"21376","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2,"name":"фъстък","roundSold":0,"sum":0},{"id":"21374, 21375","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"лешник/бадем","roundSold":0,"sum":0},{"id":"23559","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Jack Honey","roundSold":0,"sum":0},{"id":"21390.., 21400.., 22760..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2,"name":"коктейли","roundSold":0,"sum":0},{"id":"21727..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Фреш; лимонада","roundSold":0,"sum":0},{"id":"23554","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Самбука кафе","roundSold":0,"sum":0},{"id":"23553","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Скинос","roundSold":0,"sum":0},{"id":"23615","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Maker's Mark","roundSold":0,"sum":0},{"id":"23649","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Monkey Shoulder","roundSold":0,"sum":0},{"id":"21308","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Tullamore Dew","roundSold":0,"sum":0},{"id":"23682","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Naked Grouse","roundSold":0,"sum":0},{"id":"33","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":65,"name":"ПРОМОЦИЯ Буш + 4 кена","roundSold":0,"sum":0},{"id":"22","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":65,"name":"ПРОМОЦИЯ Джони Уокър + 4 кена","roundSold":0,"sum":0}],
    "2019-06-25": [{"id":"21209..","minus":0,"mplus":0,"starts":1.1,"ends":0.9,"diff":0.2,"qtySold":28.571428571428573,"price":2.2,"name":"Кафе","roundSold":29,"sum":63.8},{"id":"21210","minus":0,"mplus":0,"starts":10,"ends":1,"diff":9,"qtySold":9,"price":2.4,"name":"Безкофеин","roundSold":9,"sum":21.6},{"id":"21216..","minus":0,"mplus":0,"starts":0.18,"ends":0.16,"diff":0.02,"qtySold":0.02,"price":1.2,"name":"Нес кафе","roundSold":0,"sum":0},{"id":"21219","minus":0,"mplus":0,"starts":0.11,"ends":0.1,"diff":0.01,"qtySold":0.002,"price":1.2,"name":"Какао","roundSold":0,"sum":0},{"id":"21197..","minus":0,"mplus":0,"starts":2.1,"ends":2,"diff":0.1,"qtySold":0.5,"price":1.2,"name":"Мляко","roundSold":0.5,"sum":0.6},{"id":"21201","minus":0,"mplus":0,"starts":12,"ends":11,"diff":1,"qtySold":1,"price":2.5,"name":"LaFesta","roundSold":1,"sum":2.5},{"id":"21205..","minus":0,"mplus":0,"starts":23,"ends":22,"diff":1,"qtySold":1,"price":2,"name":"Чай","roundSold":1,"sum":2},{"id":"21203","minus":0,"mplus":0,"starts":14,"ends":10,"diff":4,"qtySold":4,"price":0.5,"name":"Мед","roundSold":4,"sum":2},{"id":"21202","minus":0,"mplus":0,"starts":20,"ends":19,"diff":1,"qtySold":1,"price":0.5,"name":"Сметана","roundSold":1,"sum":0.5},{"id":"21232","minus":0,"mplus":0,"starts":45,"ends":37,"diff":8,"qtySold":8,"price":1.8,"name":"Мин. Вода 0.5","roundSold":8,"sum":14.4},{"id":"21225","minus":0,"mplus":0,"starts":43,"ends":39,"diff":4,"qtySold":4,"price":1.8,"name":"Сода 0.5","roundSold":4,"sum":7.2},{"id":"21221..","minus":0,"mplus":0,"starts":2,"ends":1,"diff":1,"qtySold":1,"price":3.5,"name":"Студен чай","roundSold":1,"sum":3.5},{"id":"21236..","minus":0,"mplus":0,"starts":45,"ends":42,"diff":3,"qtySold":15,"price":2,"name":"Сок","roundSold":15,"sum":30},{"id":"21228..","minus":0,"mplus":0,"starts":123,"ends":100,"diff":23,"qtySold":23,"price":2.2,"name":"Кутийка","roundSold":23,"sum":50.6},{"id":"21235","minus":0,"mplus":0,"starts":15,"ends":14,"diff":1,"qtySold":1,"price":4.5,"name":"Shark","roundSold":1,"sum":4.5},{"id":"21234","minus":0,"mplus":0,"starts":10,"ends":10,"diff":0,"qtySold":0,"price":5,"name":"Red Bull","roundSold":0,"sum":0},{"id":"6","minus":0,"mplus":0,"starts":7,"ends":5,"diff":2,"qtySold":2,"price":4,"name":"Ginger beer","roundSold":2,"sum":8},{"id":"21257, 22724","minus":0,"mplus":0,"starts":70,"ends":40,"diff":30,"qtySold":30,"price":3.5,"name":"Staropramen","roundSold":30,"sum":105},{"id":"21256","minus":0,"mplus":0,"starts":35,"ends":32,"diff":3,"qtySold":3,"price":3,"name":"Stela artois","roundSold":3,"sum":9},{"id":"22041","minus":0,"mplus":0,"starts":8,"ends":8,"diff":0,"qtySold":0,"price":9,"name":"Primator ALL","roundSold":0,"sum":0},{"id":"5","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":6,"name":"Приматор ТЪЩА","roundSold":0,"sum":0},{"id":"21265","minus":0,"mplus":0,"starts":4,"ends":4,"diff":0,"qtySold":0,"price":6,"name":"Bernard Swing","roundSold":0,"sum":0},{"id":"21268","minus":0,"mplus":0,"starts":20,"ends":19,"diff":1,"qtySold":1,"price":6,"name":"Диво пиво","roundSold":1,"sum":6},{"id":"21258, 21262","minus":0,"mplus":0,"starts":23,"ends":23,"diff":0,"qtySold":0,"price":3.8,"name":"Heinecken; Leffe","roundSold":0,"sum":0},{"id":"21266, 22152","minus":0,"mplus":0,"starts":44,"ends":44,"diff":0,"qtySold":0,"price":5,"name":"Regent; Bernard svetlo","roundSold":0,"sum":0},{"id":"21264","minus":0,"mplus":0,"starts":12,"ends":12,"diff":0,"qtySold":0,"price":5,"name":"Corona","roundSold":0,"sum":0},{"id":"21255","minus":0,"mplus":0,"starts":11,"ends":11,"diff":0,"qtySold":0,"price":4,"name":"Столично","roundSold":0,"sum":0},{"id":"21260, 21270","minus":0,"mplus":0,"starts":4,"ends":4,"diff":0,"qtySold":0,"price":5,"name":"G 330; Kilkenny","roundSold":0,"sum":0},{"id":"21261","minus":0,"mplus":0,"starts":3,"ends":3,"diff":0,"qtySold":0,"price":6,"name":"G 440","roundSold":0,"sum":0},{"id":"21772","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":4,"name":"Schoeffer grapefruit","roundSold":0,"sum":0},{"id":"21267","minus":0,"mplus":0,"starts":6,"ends":6,"diff":0,"qtySold":0,"price":3.5,"name":"Claustaller","roundSold":0,"sum":0},{"id":"21271","minus":0,"mplus":0,"starts":12,"ends":12,"diff":0,"qtySold":0,"price":4.8,"name":"Schoefferhofer","roundSold":0,"sum":0},{"id":"21361, 21875, 21866","minus":0,"mplus":0,"starts":7,"ends":7,"diff":0,"qtySold":0,"price":5,"name":"Вино бут.","roundSold":0,"sum":0},{"id":"21885, 21364, 21874","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Вино чаши","roundSold":0,"sum":0},{"id":"4","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6.5,"name":"Вино бокс чаша","roundSold":0,"sum":0},{"id":"24567","minus":0,"mplus":0,"starts":3,"ends":2.9,"diff":0.1,"qtySold":2,"price":2.2,"name":"Savoy джин","roundSold":2,"sum":4.4},{"id":"21354, 21344","minus":0,"mplus":0,"starts":0.7,"ends":0.7,"diff":0,"qtySold":0,"price":3.5,"name":"Коняк; Ракия БГ","roundSold":0,"sum":0},{"id":"3","minus":0,"mplus":0,"starts":0.2,"ends":0.2,"diff":0,"qtySold":0,"price":3.5,"name":"Ракия Грапа","roundSold":0,"sum":0},{"id":"21294","minus":0,"mplus":0,"starts":0.75,"ends":0.7,"diff":0.05,"qtySold":1,"price":2.2,"name":"Мента","roundSold":1,"sum":2.2},{"id":"21275..","minus":0,"mplus":0,"starts":1.1,"ends":1.05,"diff":0.05,"qtySold":0.0011363636363636365,"price":4.4,"name":"Smirnoff","roundSold":0,"sum":0},{"id":"21278..","minus":0,"mplus":0,"starts":0.85,"ends":0.65,"diff":0.2,"qtySold":0.004545454545454546,"price":4.4,"name":"Absolut","roundSold":0,"sum":0},{"id":"21277","minus":0,"mplus":0,"starts":1.45,"ends":0.94,"diff":0.51,"qtySold":0.011590909090909091,"price":4.4,"name":"Finlandia","roundSold":0,"sum":0},{"id":"21283..","minus":0,"mplus":0,"starts":2,"ends":2,"diff":0,"qtySold":0,"price":3.8,"name":"Sobieski","roundSold":0,"sum":0},{"id":"21285","minus":0,"mplus":0,"starts":1.45,"ends":1.45,"diff":0,"qtySold":0,"price":4.4,"name":"Руски Стандарт","roundSold":0,"sum":0},{"id":"2","minus":0,"mplus":0,"starts":2.1,"ends":2.1,"diff":0,"qtySold":0,"price":5.5,"name":"Reyka","roundSold":0,"sum":0},{"id":"21414","minus":0,"mplus":0,"starts":1.5,"ends":1.5,"diff":0,"qtySold":0,"price":2.7,"name":"Житная","roundSold":0,"sum":0},{"id":"24553","minus":0,"mplus":0,"starts":0.85,"ends":0.85,"diff":0,"qtySold":0,"price":4.5,"name":"Gordon's","roundSold":0,"sum":0},{"id":"24554","minus":0,"mplus":0,"starts":0.45,"ends":0.45,"diff":0,"qtySold":0,"price":5.2,"name":"Tanquery","roundSold":0,"sum":0},{"id":"24551","minus":0,"mplus":0,"starts":0.5,"ends":0.2,"diff":0.3,"qtySold":0.006818181818181818,"price":4.5,"name":"Beefeater","roundSold":0,"sum":0},{"id":"24552","minus":0,"mplus":0,"starts":0.2,"ends":0.2,"diff":0,"qtySold":0,"price":6,"name":"Bombay Sapphire","roundSold":0,"sum":0},{"id":"24556","minus":0,"mplus":0,"starts":0.9,"ends":0.8,"diff":0.1,"qtySold":0.002272727272727273,"price":7,"name":"Hendrick's","roundSold":0,"sum":0},{"id":"24569","minus":0,"mplus":0,"starts":1,"ends":1,"diff":0,"qtySold":0,"price":6,"name":"Bulldog","roundSold":0,"sum":0},{"id":"13673","minus":0,"mplus":0,"starts":2,"ends":2,"diff":2,"qtySold":40,"price":1,"name":"Просеко","roundSold":40,"sum":40},{"id":"21305","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Famouse Grouse","roundSold":0,"sum":0},{"id":"21304","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Johnnie Walker","roundSold":0,"sum":0},{"id":"21323","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Johnnie 12*","roundSold":0,"sum":0},{"id":"23556","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":10,"name":"Gentleman Jack","roundSold":0,"sum":0},{"id":"21324","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Skallywag","roundSold":0,"sum":0},{"id":"21296","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Jim Beam","roundSold":0,"sum":0},{"id":"21297","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"4 Roses","roundSold":0,"sum":0},{"id":"21298","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Jack Daniels","roundSold":0,"sum":0},{"id":"21309","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Paddy","roundSold":0,"sum":0},{"id":"21306","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Jameson","roundSold":0,"sum":0},{"id":"21302","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6.2,"name":"John Power","roundSold":0,"sum":0},{"id":"21307","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Bushmill's","roundSold":0,"sum":0},{"id":"21690","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Glenfiddich","roundSold":0,"sum":0},{"id":"21409","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":9,"name":"Bush 10*","roundSold":0,"sum":0},{"id":"21325","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Black Bush ","roundSold":0,"sum":0},{"id":"21359, 21388, 21389","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.3,"name":"Текила 2.00","roundSold":0,"sum":0},{"id":"21360","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Текила 100%","roundSold":0,"sum":0},{"id":"21322","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7.5,"name":"Eldor 12","roundSold":0,"sum":0},{"id":"21319","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Eldor 15","roundSold":0,"sum":0},{"id":"21314","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Havana","roundSold":0,"sum":0},{"id":"21317","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Santiago","roundSold":0,"sum":0},{"id":"21318","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"El Dor 8*","roundSold":0,"sum":0},{"id":"23683","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Brugal","roundSold":0,"sum":0},{"id":"21312","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Morgan","roundSold":0,"sum":0},{"id":"23160","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"El Dor 3*","roundSold":0,"sum":0},{"id":"22040","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"El Dor 5*","roundSold":0,"sum":0},{"id":"21771","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Angostura","roundSold":0,"sum":0},{"id":"21320","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"S.Jerry","roundSold":0,"sum":0},{"id":"21345","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Metaxa 5*","roundSold":0,"sum":0},{"id":"21346","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Hennessy","roundSold":0,"sum":0},{"id":"21350","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Узо","roundSold":0,"sum":0},{"id":"21348, 21349","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Pernod; Ricard","roundSold":0,"sum":0},{"id":"21351","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Absente Fr.","roundSold":0,"sum":0},{"id":"21338..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Martini","roundSold":0,"sum":0},{"id":"21343","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Campari","roundSold":0,"sum":0},{"id":"21330","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Kahlua","roundSold":0,"sum":0},{"id":"21332","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Malibu","roundSold":0,"sum":0},{"id":"21355","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Cachasa","roundSold":0,"sum":0},{"id":"21333","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Bols","roundSold":0,"sum":0},{"id":"21334","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":1.5,"name":"Гренадин","roundSold":0,"sum":0},{"id":"21335","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Коантро","roundSold":0,"sum":0},{"id":"22725","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Tia Maria","roundSold":0,"sum":0},{"id":"21329","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Bailey's","roundSold":0,"sum":0},{"id":"21331, 22039","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.5,"name":"After Shock; Stroh","roundSold":0,"sum":0},{"id":"22986","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Tatratea","roundSold":0,"sum":0},{"id":"21336","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.5,"name":"Jagermeister","roundSold":0,"sum":0},{"id":"1","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Aperol","roundSold":0,"sum":0},{"id":"21376","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2,"name":"фъстък","roundSold":0,"sum":0},{"id":"21374, 21375","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"лешник/бадем","roundSold":0,"sum":0},{"id":"23559","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Jack Honey","roundSold":0,"sum":0},{"id":"21390.., 21400.., 22760..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2,"name":"коктейли","roundSold":0,"sum":0},{"id":"21727..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Фреш; лимонада","roundSold":0,"sum":0},{"id":"23554","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Самбука кафе","roundSold":0,"sum":0},{"id":"23553","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3,"name":"Скинос","roundSold":0,"sum":0},{"id":"23615","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Maker's Mark","roundSold":0,"sum":0},{"id":"23649","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Monkey Shoulder","roundSold":0,"sum":0},{"id":"21308","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Tullamore Dew","roundSold":0,"sum":0},{"id":"23682","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":8,"name":"Naked Grouse","roundSold":0,"sum":0},{"id":"33","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":65,"name":"ПРОМОЦИЯ Буш + 4 кена","roundSold":0,"sum":0},{"id":"22","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":65,"name":"ПРОМОЦИЯ Джони Уокър + 4 кена","roundSold":0,"sum":0}]
  };

  //view with rendered column data
  revSheetView = {};
  sumSheet = {};
  sumSheetView = {};
  taraSheetView = [];

  tempTara: Array<any> = [];  
  tempSummary: Array<any> = [];  
  tempRevizia = {};

  summary = {};
  // store scroll offset for menu tab idx
  tabScrollPos = [];
  tabSelectedIdx: number;
  revizia = {};
  revKeys = [];
  constructor(data: DataService) {
    this.menuList = this.getLocal("menuList") || this.menuList;
    // this.revizia.prevList = this.getLocal("prevList") || this.revizia.prevList;
    this.revizia = this.getLocal("revData") || this.revData;
    this.taraList = this.getLocal("taraData") || this.taraList;

    var rev = {}
    this.revKeys = Object.keys(this.revizia)
    this.revKeys.sort();
    this.revKeys.forEach(day=>{
      rev[day] = this.revizia[day];
      this.revSheetView[day] = {};
    })
    
    this.revizia = rev;

    
    data.menu.subscribe(dat => {
      if (typeof dat =="string") 
      {
        var data = JSON.parse(dat);
        this.revizia = data.revizia;
        this.menuList = data.menu;
        this.store();
        
      } else {
        // MESSAGE - " Not Correct Data Loaded. Continue WITH last Data!"
      }
    });


    this.calculateSheets();
  }

  public store() {

    var json,name :string;

    // if(
      name="menuList"; 
      json = JSON.stringify(this.menuList);
        localStorage.setItem(
          name,
          json
          // CryptoJS.AES.encrypt(json, "secret key 123").toString()
        );
    // }
    
      this.calculateSheets();
      
      
      json = JSON.stringify(this.revizia);
      name = "revData"
        localStorage.setItem(
         name,
         json
          // CryptoJS.AES.encrypt(json, "secret key 123").toString()
        );

        json = JSON.stringify(this.summary);
      name = "sumData"
        localStorage.setItem(
         name,
         json
          // CryptoJS.AES.encrypt(json, "secret key 123").toString()
        );
// console.log(this.taraList)
        json = JSON.stringify(this.taraList);
        name = "taraData"
          localStorage.setItem(
           name,
           json
            // CryptoJS.AES.encrypt(json, "secret key 123").toString()
          );
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

  calculateSheets(){
    this.tempSummary  = [];
    this.tempTara = [];

    this.revKeys.forEach(key=>{
      this.calculateSheet(key)
    });

  }

  public calculateSheet(date) {
    // this.tempTara = [];
    // this.tempSummary=[];
    // this.tempRevizia[date]=[];

    this[date + "Sum"] = 0;
    this.menuList.forEach(tab => {

      if(!this.tempSummary[tab.name]) this.tempSummary[tab.name]=[];
      if(!this.tempTara[tab.name]) this.tempTara[tab.name]=[];
     
      var tempList: Array<any> = [];
     
      tab.data.forEach((item, id) => { 
       
        var prevDayIdx = this.revKeys.indexOf(date)-1;

         // console.log(prevIdx)
        var itm = this.revItemCalculator(Object.assign({},item), date, prevDayIdx);
        if (itm) {
         // this.tempRevizia[date].push(itm);
          tempList[id] = itm;
          
          this[date + "Sum"] += Number(itm.sum) || 0;
           
          this.tempSummary[tab.name][id] = this.sumProp(this.tempSummary[tab.name][id],itm);
          
          this.tempTara[tab.name][id] = this.taraSums(Object.assign({},item));
          
           this.tempSummary["sumTotal"] += Number(itm.sum) || 0;
           //this.sumSheet = 
        }
      });
      //  console.log(tempList)

      this.revSheetView[date][tab.name] = tempList;
      // this.taraSheetView[tab.name] = this.tempTara;      
      
    });

    // console.log(this.revSheetView)
    this.sumSheetView = this.tempSummary;
     this.taraSheetView = this.tempTara; 
    //  this.revizia = this.tempRevizia;
    //  console.log(this.taraSheetView)
    return this[date];
  }

  sumProp(a,b){
    // console.log(a);
    if(!a) return b;
    var obj ={}
      Object.keys(a).map(function(x){
        switch (x){
          case "name": 
          case "starts":
          case "price":
            if(!obj[x]) obj[x] = a[x];
            break;
          case "ends":
            obj[x] = b[x];break;
          default:  
          obj[x] = a[x]+b[x];
          obj[x] = Math.round(obj[x] * 1000)/1000;
          break;
        }
       });
      //  console.log(obj)
    return obj;
  }

  taraSums(menuItem){
    var item = this.taraList.filter(i=>
      {return i.id == menuItem.id;
      })[0]||{bruto: 0,
        bruto1: 0,
        tara:0,
        tara1:0,
        taraQty:0,
        taraQty1:0,
        start: 0,
        buy:0,
        end: 0};
        
        var tItem = Object.assign(menuItem,item);
    
    

    tItem.net = (tItem.bruto1-tItem.tara1)||(tItem.bruto-tItem.tara)/0.7;
    // tItem.end = 
    this.taraList[this.taraList.indexOf(item)]= tItem;

    return tItem;
  }

  public revItemCalculator( menuItem, date, prevDayIdx) {

        var revItem = this.revizia[date].filter(i => {
          return i.id == menuItem.id;
        })[0]||{
          id: menuItem.id,
          minus: 0,
          mplus: 0,
          starts: 0,
          ends: 0};

      // this.revizia[date].push(revItem); // ?????
// console.log(this.revizia[date])
    if((prevDayIdx>-1))
    {
      var prevDay = this.revKeys[prevDayIdx];
    var prevRev = this.revizia[prevDay].filter(i => {
        return i.id == menuItem.id;
      })[0] || {};
    revItem.starts = prevRev["ends"] || 0;
    // console.log(prevRev)
    }
  var item = Object.assign(menuItem,revItem);
    item = this.viewItemCalc(item);
    // console.log(item);

    return item;
  }

  viewItemCalc(item) {
    item.diff =
      Math.round(
        (item.starts * 1 - item.ends * 1 + item.mplus * 1 + item.minus * 1) *
          1000
      ) / 1000;

    item.qtySold = Math.round((item.diff / item.qty)*1000)/1000;
    // item.price = 
    // item.name = 
    // item.id =
    item.roundSold =
      Math.round(item.diff / (item.qty * item.round)) * item.round;
    item.sum = Math.round(item.roundSold * item.price * 100) / 100;
       
        // item.end = ite
    return item;
  }

  viewTaraCalc(item,menuItem){

  }

  sumItemCalc(item, menuItem){

  }

  addMenuTab(){
    var tab = {
      name: "tabName",
      data: []
    };
    this.menuList.push(tab)
  }

  newDayTab(date):boolean{
    var datestring= this.getNewDate(date);
    
    if(this.revKeys.indexOf(datestring)==-1)  {
      this.revKeys.push(datestring);
      
      this.revizia[datestring] = [];
      
      this.revSheetView[datestring] = {};
      this.calculateSheets();

      this.revKeys.sort();
    this.store();
    }
    else{ // show calendar controll
      return false;
    }
    return true;
  }

  getNewDate(date){
    var d = date||new Date();
    if(d.getHours()<9 && !date) {
      d = new Date(d.getTime()-(d.getHours()+1)*60*60*1000);
    }
    var datestring = (d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+( (("0"+d.getDate().toString()).slice(-2))));
    return datestring;
  }

  changeDate(){
    console.log("change")
  }
}
