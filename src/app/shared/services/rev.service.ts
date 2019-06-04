import { Injectable } from "@angular/core";
import { interval } from "rxjs";
// import { Item, User, Table } from "../models/item.model";
// import { OpenTab, OpenTabs, Order, CopyA, CopyO } from "../models/tab.model";
// import * as CryptoJS from "crypto-js";
import { _localeFactory } from "@angular/core/src/application_module";
// import { DataService } from "./data.service";

// let log = console.log;
@Injectable()
export class RevService {
 
  menuList: Array<any> = [
    { id: "21209..", name: "Кафе", cost: 56, qty: 0.007, price: 2.2, round: 1 },
    { id: "21210", name: "Безкофеин", cost: 0.5, qty: 1, price: 2.4, round: 1 },
    { id: "21216..", name: "Нес кафе", cost: 50, qty: 2, price: 1.2, round: 1 },
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
    { id: "21202", name: "Сметана", cost: 0.2, qty: 1, price: 0.5, round: 1 },
    {
      id: "21232",
      name: "Мин. Вода 0.5",
      cost: 0.5,
      qty: 1,
      price: 1.8,
      round: 1
    },
    { id: "21225", name: "Сода 0.5", cost: 0.55, qty: 1, price: 1.8, round: 1 },
    {
      id: "21221..",
      name: "Студен чай",
      cost: 1.1,
      qty: 1,
      price: 3.5,
      round: 1
    },
    { id: "21236..", name: "Сок", cost: 2.5, qty: 0.2, price: 2, round: 0.5 },
    { id: "21228..", name: "Кутийка", cost: 0.8, qty: 1, price: 2.2, round: 1 },
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
    { id: "22041", name: "Primator ALL", cost: 2, qty: 1, price: 9, round: 1 },
    { id: "5", name: "Приматор ТЪЩА", cost: 2.7, qty: 1, price: 6, round: 1 },
    {
      id: "21265",
      name: "Bernard Swing",
      cost: 3.1,
      qty: 1,
      price: 6,
      round: 1
    },
    { id: "21268", name: "Диво пиво", cost: 2.3, qty: 1, price: 6, round: 1 },
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
    { id: "21255", name: "Столично", cost: 1.4, qty: 1, price: 4, round: 1 },
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
    { id: "3", name: "Ракия Грапа", cost: 20, qty: 44, price: 3.5, round: 0.5 },
    { id: "21294", name: "Мента", cost: 8, qty: 0.05, price: 2.2, round: 0.5 },
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
    { id: "21414", name: "Житная", cost: 11, qty: 44, price: 2.7, round: 0.5 },
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
    { id: "24569", name: "Bulldog", cost: 32, qty: 44, price: 6, round: 0.5 },
    { id: "1", name: "Просеко", cost: 9, qty: 0.05, price: 1, round: 1 }
  ];

  menuList1: Array<any> = [
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
      id: "",
      name: "ПРОМОЦИЯ Буш + 4 кена",
      cost: 25,
      qty: 1,
      price: 65,
      round: 1
    },
    {
      id: "",
      name: "ПРОМОЦИЯ Джони Уокър + 4 кена",
      cost: 25,
      qty: 1,
      price: 65,
      round: 1
    }
  ];
  prevList: Array<any> =[{"id":"21209..","minus":0,"mplus":0.5,"ends":1,"starts":1,"diff":0.5,"qtySold":71.42857142857143,"price":2.2,"name":"Кафе","roundSold":71,"sum":156.2},{"id":"21210","minus":0,"mplus":"","ends":9,"starts":9,"diff":0,"qtySold":0,"price":2.4,"name":"Безкофеин","roundSold":0,"sum":0},{"id":"21216..","minus":0,"mplus":0,"ends":0.2,"starts":0.2,"diff":0,"qtySold":0,"price":1.2,"name":"Нес кафе","roundSold":0,"sum":0},{"id":"21219","minus":0,"mplus":0,"ends":1,"starts":1,"diff":0,"qtySold":0,"price":1.2,"name":"Какао","roundSold":0,"sum":0},{"id":"21197..","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":1.2,"name":"Мляко","roundSold":0,"sum":0},{"id":"21201","minus":0,"mplus":0,"ends":3,"starts":3,"diff":0,"qtySold":0,"price":2.5,"name":"LaFesta","roundSold":0,"sum":0},{"id":"21205..","minus":0,"mplus":20,"ends":2,"starts":2,"diff":20,"qtySold":20,"price":2,"name":"Чай","roundSold":20,"sum":40},{"id":"21203","minus":0,"mplus":10,"ends":3,"starts":3,"diff":10,"qtySold":10,"price":0.5,"name":"Мед","roundSold":10,"sum":5},{"id":"21202","minus":0,"mplus":0,"ends":3,"starts":3,"diff":0,"qtySold":0,"price":0.5,"name":"Сметана","roundSold":0,"sum":0},{"id":"21232","minus":0,"mplus":0,"ends":23,"starts":23,"diff":0,"qtySold":0,"price":1.8,"name":"Мин. Вода 0.5","roundSold":0,"sum":0},{"id":"21225","minus":0,"mplus":0,"ends":14,"starts":14,"diff":0,"qtySold":0,"price":1.8,"name":"Сода 0.5","roundSold":0,"sum":0},{"id":"21221..","minus":0,"mplus":0,"ends":8,"starts":8,"diff":0,"qtySold":0,"price":3.5,"name":"Студен чай","roundSold":0,"sum":0},{"id":"21236..","minus":0,"mplus":4,"ends":44,"starts":44,"diff":4,"qtySold":20,"price":2,"name":"Сок","roundSold":20,"sum":40},{"id":"21228..","minus":0,"mplus":12,"ends":67,"starts":67,"diff":12,"qtySold":12,"price":2.2,"name":"Кутийка","roundSold":12,"sum":26.4},{"id":"21235","minus":0,"mplus":24,"ends":0,"starts":0,"diff":24,"qtySold":24,"price":4.5,"name":"Shark","roundSold":24,"sum":108},{"id":"21234","minus":0,"mplus":0,"ends":9,"starts":9,"diff":0,"qtySold":0,"price":5,"name":"Red Bull","roundSold":0,"sum":0},{"id":"6","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4,"name":"Ginger beer","roundSold":0,"sum":0},{"id":"21257, 22724","minus":0,"mplus":40,"ends":54,"starts":54,"diff":40,"qtySold":40,"price":3.5,"name":"Staropramen","roundSold":40,"sum":140},{"id":"21256","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":3,"name":"Stela artois","roundSold":0,"sum":0},{"id":"22041","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":9,"name":"Primator ALL","roundSold":0,"sum":0},{"id":"5","minus":0,"mplus":0,"ends":2,"starts":2,"diff":0,"qtySold":0,"price":6,"name":"Приматор ТЪЩА","roundSold":0,"sum":0},{"id":"21265","minus":0,"mplus":0,"ends":2,"starts":2,"diff":0,"qtySold":0,"price":6,"name":"Bernard Swing","roundSold":0,"sum":0},{"id":"21268","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":6,"name":"Диво пиво","roundSold":0,"sum":0},{"id":"21258, 21262","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":3.8,"name":"Heinecken; Leffe","roundSold":0,"sum":0},{"id":"21266, 22152","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5,"name":"Regent; Bernard svetlo","roundSold":0,"sum":0},{"id":"21264","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5,"name":"Corona","roundSold":0,"sum":0},{"id":"21255","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4,"name":"Столично","roundSold":0,"sum":0},{"id":"21260, 21270","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5,"name":"G 330; Kilkenny","roundSold":0,"sum":0},{"id":"21261","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":6,"name":"G 440","roundSold":0,"sum":0},{"id":"21772","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4,"name":"Schoeffer grapefruit","roundSold":0,"sum":0},{"id":"21267","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":3.5,"name":"Claustaller","roundSold":0,"sum":0},{"id":"21271","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.8,"name":"Schoefferhofer","roundSold":0,"sum":0},{"id":"21361, 21875, 21866","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5,"name":"Вино бут.","roundSold":0,"sum":0},{"id":"21885, 21364, 21874","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5,"name":"Вино чаши","roundSold":0,"sum":0},{"id":"4","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":6.5,"name":"Вино бокс чаша","roundSold":0,"sum":0},{"id":"24567","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":2.2,"name":"Savoy джин","roundSold":0,"sum":0},{"id":"21354, 21344","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":3.5,"name":"Коняк; Ракия БГ","roundSold":0,"sum":0},{"id":"3","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":3.5,"name":"Ракия Грапа","roundSold":0,"sum":0},{"id":"21294","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":2.2,"name":"Мента","roundSold":0,"sum":0},{"id":"21275..","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.4,"name":"Smirnoff","roundSold":0,"sum":0},{"id":"21278..","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.4,"name":"Absolut","roundSold":0,"sum":0},{"id":"21277","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.4,"name":"Finlandia","roundSold":0,"sum":0},{"id":"21283..","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":3.8,"name":"Sobieski","roundSold":0,"sum":0},{"id":"21285","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.4,"name":"Руски Стандарт","roundSold":0,"sum":0},{"id":"2","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5.5,"name":"Reyka","roundSold":0,"sum":0},{"id":"21414","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":2.7,"name":"Житная","roundSold":0,"sum":0},{"id":"24553","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.5,"name":"Gordon's","roundSold":0,"sum":0},{"id":"24554","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":5.2,"name":"Tanquery","roundSold":0,"sum":0},{"id":"24551","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":4.5,"name":"Beefeater","roundSold":0,"sum":0},{"id":"24552","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":6,"name":"Bombay Sapphire","roundSold":0,"sum":0},{"id":"24556","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":7,"name":"Hendrick's","roundSold":0,"sum":0},{"id":"24569","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":6,"name":"Bulldog","roundSold":0,"sum":0},{"id":"1","minus":0,"mplus":0,"ends":0,"starts":0,"diff":0,"qtySold":0,"price":1,"name":"Просеко","roundSold":0,"sum":0}];
  nextList: Array<any> =[{"id":"21209..","minus":0,"mplus":0,"starts":1,"ends":0.95,"diff":0.05,"qtySold":7.142857142857143,"price":2.2,"name":"Кафе","roundSold":7,"sum":15.4},{"id":"21210","minus":0,"mplus":0,"starts":9,"ends":7,"diff":2,"qtySold":2,"price":2.4,"name":"Безкофеин","roundSold":2,"sum":4.8},{"id":"21216..","minus":0,"mplus":0,"starts":0.2,"ends":0.18,"diff":0.02,"qtySold":10,"price":1.2,"name":"Нес кафе","roundSold":10,"sum":12},{"id":"21219","minus":0,"mplus":"","starts":1,"ends":1,"diff":0,"qtySold":0,"price":1.2,"name":"Какао","roundSold":0,"sum":0},{"id":"21197..","minus":0,"mplus":1,"starts":0,"ends":0,"diff":1,"qtySold":5,"price":1.2,"name":"Мляко","roundSold":5,"sum":6},{"id":"21201","minus":0,"mplus":1,"starts":3,"ends":3,"diff":1,"qtySold":1,"price":2.5,"name":"LaFesta","roundSold":1,"sum":2.5},{"id":"21205..","minus":0,"mplus":1,"starts":2,"ends":1,"diff":2,"qtySold":2,"price":2,"name":"Чай","roundSold":2,"sum":4},{"id":"21203","minus":0,"mplus":1,"starts":3,"ends":3,"diff":1,"qtySold":1,"price":0.5,"name":"Мед","roundSold":1,"sum":0.5},{"id":"21202","minus":0,"mplus":1,"starts":3,"ends":1,"diff":3,"qtySold":3,"price":0.5,"name":"Сметана","roundSold":3,"sum":1.5},{"id":"21232","minus":0,"mplus":"","starts":23,"ends":11,"diff":12,"qtySold":12,"price":1.8,"name":"Мин. Вода 0.5","roundSold":12,"sum":21.6},{"id":"21225","minus":0,"mplus":"","starts":14,"ends":11,"diff":3,"qtySold":3,"price":1.8,"name":"Сода 0.5","roundSold":3,"sum":5.4},{"id":"21221..","minus":0,"mplus":1,"starts":8,"ends":7,"diff":2,"qtySold":2,"price":3.5,"name":"Студен чай","roundSold":2,"sum":7},{"id":"21236..","minus":0,"mplus":1,"starts":44,"ends":41.2,"diff":3.8,"qtySold":18.999999999999996,"price":2,"name":"Сок","roundSold":19,"sum":38},{"id":"21228..","minus":0,"mplus":0,"starts":67,"ends":45,"diff":22,"qtySold":22,"price":2.2,"name":"Кутийка","roundSold":22,"sum":48.4},{"id":"21235","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Shark","roundSold":0,"sum":0},{"id":"21234","minus":0,"mplus":1,"starts":9,"ends":8,"diff":2,"qtySold":2,"price":5,"name":"Red Bull","roundSold":2,"sum":10},{"id":"6","minus":0,"mplus":1,"starts":0,"ends":0,"diff":1,"qtySold":1,"price":4,"name":"Ginger beer","roundSold":1,"sum":4},{"id":"21257, 22724","minus":0,"mplus":1,"starts":54,"ends":24,"diff":31,"qtySold":31,"price":3.5,"name":"Staropramen","roundSold":31,"sum":108.5},{"id":"21256","minus":0,"mplus":1,"starts":0,"ends":0,"diff":1,"qtySold":1,"price":3,"name":"Stela artois","roundSold":1,"sum":3},{"id":"22041","minus":0,"mplus":1,"starts":0,"ends":0,"diff":1,"qtySold":1,"price":9,"name":"Primator ALL","roundSold":1,"sum":9},{"id":"5","minus":0,"mplus":1,"starts":2,"ends":0,"diff":3,"qtySold":3,"price":6,"name":"Приматор ТЪЩА","roundSold":3,"sum":18},{"id":"21265","minus":0,"mplus":1,"starts":2,"ends":0,"diff":3,"qtySold":3,"price":6,"name":"Bernard Swing","roundSold":3,"sum":18},{"id":"21268","minus":0,"mplus":1,"starts":0,"ends":0,"diff":1,"qtySold":1,"price":6,"name":"Диво пиво","roundSold":1,"sum":6},{"id":"21258, 21262","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.8,"name":"Heinecken; Leffe","roundSold":0,"sum":0},{"id":"21266, 22152","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Regent; Bernard svetlo","roundSold":0,"sum":0},{"id":"21264","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Corona","roundSold":0,"sum":0},{"id":"21255","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Столично","roundSold":0,"sum":0},{"id":"21260, 21270","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"G 330; Kilkenny","roundSold":0,"sum":0},{"id":"21261","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"G 440","roundSold":0,"sum":0},{"id":"21772","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4,"name":"Schoeffer grapefruit","roundSold":0,"sum":0},{"id":"21267","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.5,"name":"Claustaller","roundSold":0,"sum":0},{"id":"21271","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.8,"name":"Schoefferhofer","roundSold":0,"sum":0},{"id":"21361, 21875, 21866","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Вино бут.","roundSold":0,"sum":0},{"id":"21885, 21364, 21874","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5,"name":"Вино чаши","roundSold":0,"sum":0},{"id":"4","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6.5,"name":"Вино бокс чаша","roundSold":0,"sum":0},{"id":"24567","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.2,"name":"Savoy джин","roundSold":0,"sum":0},{"id":"21354, 21344","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.5,"name":"Коняк; Ракия БГ","roundSold":0,"sum":0},{"id":"3","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.5,"name":"Ракия Грапа","roundSold":0,"sum":0},{"id":"21294","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.2,"name":"Мента","roundSold":0,"sum":0},{"id":"21275..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.4,"name":"Smirnoff","roundSold":0,"sum":0},{"id":"21278..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.4,"name":"Absolut","roundSold":0,"sum":0},{"id":"21277","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.4,"name":"Finlandia","roundSold":0,"sum":0},{"id":"21283..","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":3.8,"name":"Sobieski","roundSold":0,"sum":0},{"id":"21285","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.4,"name":"Руски Стандарт","roundSold":0,"sum":0},{"id":"2","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.5,"name":"Reyka","roundSold":0,"sum":0},{"id":"21414","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":2.7,"name":"Житная","roundSold":0,"sum":0},{"id":"24553","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Gordon's","roundSold":0,"sum":0},{"id":"24554","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":5.2,"name":"Tanquery","roundSold":0,"sum":0},{"id":"24551","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":4.5,"name":"Beefeater","roundSold":0,"sum":0},{"id":"24552","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Bombay Sapphire","roundSold":0,"sum":0},{"id":"24556","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":7,"name":"Hendrick's","roundSold":0,"sum":0},{"id":"24569","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":6,"name":"Bulldog","roundSold":0,"sum":0},{"id":"1","minus":0,"mplus":0,"starts":0,"ends":0,"diff":0,"qtySold":0,"price":1,"name":"Просеко","roundSold":0,"sum":0}];

  constructor() { //data:DataService
    this.menuList = this.getLocal("menuList") || this.menuList;

    this.prevList = this.getLocal("prevList") || this.prevList;

    this.nextList = this.getLocal("nextList") || this.nextList;

    this.prevList = this.calculateSheet("prevList");

    this.nextList = this.calculateSheet("nextList");

    // data.menu.subscribe(data => {
    //   if (data["menu"]) {
    //     this.menuList = (data["menu"]); //copyO
    //     this.store("menuList");
    //   } else {
    //     // MESSAGE - " Not Correct Data Loaded. Continue WITH last Data!"
    //   }
    // });
  }

  public store(name) {
    // log(obj);
    let json = JSON.stringify(this[name]);
    localStorage.setItem(
      name,
      json
      // CryptoJS.AES.encrypt(json, "secret key 123").toString()
    );
    // if(name=="menuList")
    {
      this.prevList = this.calculateSheet("prevList");
      this.nextList = this.calculateSheet("nextList");    
    }
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

  public calculateSheet(date) {
    this[date+"Sum"] =0;
    var tempList: Array<any> = [];
    this.menuList.forEach((item, id) => {
      var itm = this.revListCalculator(
        this[date].filter(i => {
          return i.id == item.id;
        })[0],
        item,
        this.prevList
      );
      if (itm) {
        tempList[id] = itm;
        this[date+"Sum"] += Number(itm.sum)||0;
        // console.log(Number(itm.sum))
        
      }
    });
    // this
    console.log(this[date+"Sum"])
    return tempList;
  }

  public revListCalculator(item, menuItem, prevDate) {
    if (!item)
      item = {
        id: menuItem.id,
        minus: 0,
        mplus: 0,
        starts: 0,
        ends: 0
      };
    var prevDay =
      this.prevList.filter(i => {
        return i.id == menuItem.id;
      })[0] || {};
    item.starts = prevDay.ends || 0;
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

}
