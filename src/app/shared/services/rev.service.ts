import { Injectable } from "@angular/core";
import { taraItem, reviziaItem, cashItem } from "app/shared/models/item.model";

import { Router } from "@angular/router";
import * as firebase from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { DataService } from "./data.service";

@Injectable()
export class RevService {
  view = [];

  menuList = [
    {
      name: "Beers",
      data: [
        {
          cost: 59,
          id: "21209..",
          name: "Coffee",
          price: 2.2,
          qty: 0.007,
          qtyBruto: 147,
          round: 2
        },
        {
          cost: 0.5,
          id: 21210,
          name: "Decaffeino",
          price: 2.2,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 50,
          id: "21216..",
          name: "Nescafe",
          price: 1.2,
          qty: 2,
          qtyBruto: 500,
          round: 1
        },
        {
          cost: 40,
          id: "21219",
          name: "Cocoa Powder",
          price: 1.2,
          qty: 5,
          qtyBruto: 200,
          round: 1
        },
        {
          cost: 2,
          id: "21197..",
          name: "Мляко",
          price: 1.2,
          qty: 0.2,
          qtyBruto: 5,
          round: 0.5
        },
        {
          cost: 1,
          id: "21201",
          name: "LaFesta",
          price: 2.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 0.15,
          id: "21205..",
          name: "Чай",
          price: 2,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 0.2,
          id: "21203",
          name: "Мед",
          price: 0.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 0.2,
          id: "21202",
          name: "Сметана",
          price: 0.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 0.5,
          id: "21232",
          name: "Мин. Вода 0.5",
          price: 1.8,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 0.55,
          id: "21225",
          name: "Сода 0.5",
          price: 1.8,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.1,
          id: "21221..",
          name: "Студен чай",
          price: 3.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.5,
          id: "21236..",
          name: "Сок",
          price: 2,
          qty: 0.2,
          qtyBruto: 5,
          round: 0.5
        },
        {
          cost: 0.8,
          id: "21228..",
          name: "Кутийка",
          price: 2.2,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.4,
          id: "21235",
          name: "Гларус",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.5,
          id: "new54",
          name: "Съмърсби",
          price: 3.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2,
          id: "21234",
          name: "Red Bull",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 3,
          id: "6",
          name: "Ginger beer",
          price: 5.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1,
          id: "new55",
          name: "Каменица",
          price: 3.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.5,
          id: "new56",
          name: "Чисто и Просто",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.13,
          id: "21257, 22724",
          name: "Staropramen",
          price: 3.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.3,
          id: "21256",
          name: "Stela artois",
          price: 4,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2,
          id: "22041",
          name: "Primator ALL",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.7,
          id: "5",
          name: "Приматор ТЪЩА",
          price: 6,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 3.1,
          id: "21265",
          name: "Bernard Swing",
          price: 6,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.3,
          id: "21268",
          name: "Диво пиво",
          price: 6,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.8,
          id: "21258, 21262",
          name: "Heinecken; Leffe",
          price: 3.8,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.1,
          id: "21266, 22152",
          name: "Regent; Bernard svetlo",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.35,
          id: "21264",
          name: "Corona",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.4,
          id: "21255",
          name: "Столично",
          price: 4,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.5,
          id: "21260, 21270",
          name: "G 330; Kilkenny",
          price: 5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 3.1,
          id: "21261",
          name: "G 440",
          price: 6,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.4,
          id: "21772",
          name: "Schoeffer grapefruit",
          price: 4,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1.6,
          id: "21267",
          name: "Claustaller",
          price: 3.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.1,
          id: "21271",
          name: "Schoefferhofer",
          price: 4.8,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 9,
          id: "21361, 21875, 21866",
          name: "Вино бут.",
          price: 5,
          qty: 0.15,
          qtyBruto: 5,
          round: 1
        },
        {
          cost: 2.6,
          id: "21885, 21364, 21874",
          name: "Вино чаши",
          price: 5,
          qty: 0.15,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 12,
          id: "4",
          name: "Вино бокс чаша",
          price: 6.5,
          qty: 0.15,
          qtyBruto: 20,
          round: 1
        },
        {
          cost: 10,
          id: "24567",
          name: "Savoy джин",
          price: 2.2,
          qty: 0.05,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 20,
          id: "21354, 21344",
          name: "Коняк; Ракия БГ",
          price: 3.5,
          qty: 0.05,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 20,
          id: "3",
          name: "Ракия Грапа",
          price: 3.5,
          qty: 0.05,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 8,
          id: "21294",
          name: "Мента",
          price: 2.2,
          qty: 0.05,
          qtyBruto: 20,
          round: 0.5
        }
      ]
    },
    {
      name: "Vodka,Gin",

      data: [
        {
          cost: 22,
          id: "21275..",
          name: "Smirnoff",
          price: 4.4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 24,
          id: "21278..",
          name: "Absolut",
          price: 4.4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 21,
          id: "21277",
          name: "Finlandia",
          price: 4.4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 21,
          id: "21283..",
          name: "Sobieski",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 22,
          id: "21285",
          name: "Руски Стандарт",
          price: 4.4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 35,
          id: "2",
          name: "Reyka",
          price: 5.5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 11,
          id: "21414",
          name: "Житная",
          price: 2.7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 25,
          id: "24553",
          name: "Gordon's",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 33,
          id: "24554",
          name: "Tanquery",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 26,
          id: "24551",
          name: "Beefeater",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 42,
          id: "24552",
          name: "Bombay Sapphire",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 48,
          id: "24556",
          name: "Hendrick's",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 32,
          id: "24569",
          name: "Bulldog",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 23,
          id: "new57",
          name: "Bickens",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 9,
          id: "13673",
          name: "Просеко",
          price: 1,
          qty: 0.05,
          qtyBruto: 20,
          round: 1
        },
        {
          cost: 30,
          id: "new53",
          name: "Воздух",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        }
      ]
    },
    {
      name: "Whiskey",

      data: [
        {
          cost: 30,
          id: "21305",
          name: "Famouse Grouse",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 27,
          id: "21304",
          name: "Johnnie Walker",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 48,
          id: "21323",
          name: "Johnnie 12*",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 60,
          id: "23556",
          name: "Gentleman Jack",
          price: 10,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 1,
          id: "21324",
          name: "",
          price: 1,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 21,
          id: "21296",
          name: "Jim Beam",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 31,
          id: "21297",
          name: "4 Roses",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 42,
          id: "21298",
          name: "Jack Daniels",
          price: 6.5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 29,
          id: "21309",
          name: "Paddy",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 30,
          id: "21306",
          name: "Jameson",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 41,
          id: "21302",
          name: "John Power",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 27,
          id: "21307",
          name: "Bushmill's",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 68,
          id: "21690",
          name: "Glenfiddich",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 56,
          id: "21409",
          name: "Bush 10*",
          price: 9,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 55,
          id: "23559",
          name: "Jack Honey",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 43,
          id: "21325",
          name: "Black Bush ",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 50,
          id: "23615",
          name: "Maker's Mark",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 42,
          id: "23649",
          name: "Monkey Shoulder",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 29,
          id: "21308",
          name: "Tullamore Dew",
          price: 5.2,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 41,
          id: "23682",
          name: "Naked Grouse",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 25,
          id: "33",
          name: "ПРОМОЦИЯ Буш + 4 кена",
          price: 65,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 25,
          id: "22",
          name: "ПРОМОЦИЯ Джони Уокър + 4 кена",
          price: 65,
          qty: 1,
          qtyBruto: 1,
          round: 1
        }
      ]
    },
    {
      name: "Rum,Liqeuers",

      data: [
        {
          cost: 25,
          id: "21359, 21388, 21389",
          name: "Текила 2.00",
          price: 2.5,
          qty: 23,
          qtyBruto: 40,
          round: 1
        },
        {
          cost: 25,
          id: "21360",
          name: "Текила 100%",
          price: 3,
          qty: 23,
          qtyBruto: 40,
          round: 1
        },
        {
          cost: 80,
          id: "21322",
          name: "Eldor 12",
          price: 7.5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 95,
          id: "21319",
          name: "Eldor 15",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 29,
          id: "21314",
          name: "Havana",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 31,
          id: "21317",
          name: "Santiago",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 55,
          id: 21316,
          name: "Havana 7*",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 23,
          id: "23683",
          name: "Brugal",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 23,
          id: "21312",
          name: "Morgan",
          price: 4.5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 27,
          id: "23160",
          name: "El Dor 3*",
          price: 5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 31,
          id: "22040",
          name: "El Dor 5*",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 42,
          id: "21318",
          name: "El Dor 8*",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 69,
          id: "21771",
          name: "Angostura",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 40,
          id: "21320",
          name: "S.Jerry",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 27,
          id: "21345",
          name: "Metaxa 5*",
          price: 4.5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 70,
          id: "21346",
          name: "Hennessy",
          price: 8,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 22,
          id: "21350",
          name: "Узо",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 27,
          id: "21348, 21349",
          name: "Pernod; Ricard",
          price: 4.5,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 53,
          id: "21351",
          name: "Absente Fr.",
          price: 7,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 20,
          id: "21338..",
          name: "Martini",
          price: 3,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 29,
          id: "21343",
          name: "Campari",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 33,
          id: "21330",
          name: "Kahlua",
          price: 5,
          qty: 45,
          qtyBruto: 20,
          round: 0.2
        },
        {
          cost: 20,
          id: "21332",
          name: "Malibu",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 28,
          id: "21355",
          name: "Cachasa",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 25,
          id: "21333",
          name: "Bols",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.2
        },
        {
          cost: 17,
          id: "21334",
          name: "Гренадин",
          price: 1.5,
          qty: 46,
          qtyBruto: 20,
          round: 0.2
        },
        {
          cost: 47,
          id: "21335",
          name: "Коантро",
          price: 6,
          qty: 50,
          qtyBruto: 20,
          round: 0.2
        },
        {
          cost: 39,
          id: "22725",
          name: "Tia Maria",
          price: 5,
          qty: 48,
          qtyBruto: 20,
          round: 0.2
        },
        {
          cost: 27,
          id: "21329",
          name: "Bailey's",
          price: 4,
          qty: 48,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 52,
          id: "21331, 22039",
          name: "After Shock; Stroh",
          price: 3.5,
          qty: 23,
          qtyBruto: 40,
          round: 1
        },
        {
          cost: 40,
          id: "22986",
          name: "Tatratea",
          price: 6,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 29,
          id: "21336",
          name: "Jagermeister",
          price: 2.5,
          qty: 23,
          qtyBruto: 40,
          round: 1
        },
        {
          cost: 25,
          id: "1",
          name: "Aperol",
          price: 4,
          qty: 44,
          qtyBruto: 20,
          round: 0.5
        },
        {
          cost: 0.7,
          id: "21376",
          name: "фъстък",
          price: 2.5,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 2.5,
          id: "21374, 21375",
          name: "лешник/бадем",
          price: 4,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },

        {
          cost: 1,
          id: "21390.., 21400.., 22760..",
          name: "коктейли",
          price: 2,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 1,
          id: "21727..",
          name: "Фреш; лимонада",
          price: 3,
          qty: 1,
          qtyBruto: 1,
          round: 1
        },
        {
          cost: 22,
          id: "23554",
          name: "Самбука кафе",
          price: 3,
          qty: 23,
          qtyBruto: 40,
          round: 1
        },
        {
          cost: 33,
          id: "23553",
          name: "Скинос",
          price: 3,
          qty: 23,
          qtyBruto: 40,
          round: 1
        }
      ]
    },
    {
      data: [
        {
          cost: 0,
          id: "new0",
          name: "new",
          price: 1,
          qty: 0,
          round: 0
        },
        {
          cost: 0,
          id: "new1",
          name: "new",
          price: 0,
          qty: 0,
          round: 0
        }
      ],
      name: "Wines,Liqueurs"
    },
    {
      data: [
        {
          cost: 0,
          id: "new0",
          name: "new",
          price: 1,
          qty: 0,
          round: 0
        }
      ],
      name: "Cocktails"
    }
  ];

  // menuList2 = [
  //   {
  //     name: "non",
  //     data: [
  //       {
  //         id: "21210",
  //         name: "Кафе",
  //         cost: 56,
  //         qty: 0.007,
  //         price: 2.2,
  //         round: 1
  //       }
  //     ]
  //   }
  // ];

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

  storeData = {
    name: "Test",
    areas: [{ id: "srg", name: "bar 1" }],
    managedDBs: {}
  };

  cashData = [
    {
      id: "asd",
      data: {
        "2019-01-01": [{}]
      }
    }
  ];
  revData = [];

  // taraList = [
  //   {
  //     bruto: 0,
  //     bruto1: 0,
  //     buy: 4,
  //     diff: 0,
  //     end: 0,
  //     id: "21210",
  //     inStore: 0,
  //     name: "",
  //     net: 1,
  //     netStart: 1,
  //     start: 1,
  //     startRev: 1,
  //     tara: 0,
  //     tara1: 0,
  //     taraQty: 0,
  //     taraQty1: 0
  //   }
  // ];

  taraList = [
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 18.5,
      diffCash: 81.4,
      end: 23,
      id: "21210",
      inStore: "",
      name: "Безкофеин",
      net: 1,
      netDiff: -12,
      netStart: 11,
      netstart: "",
      start: 11,
      startRev: 11,
      tara: 0,
      tara1: 0,
      taraQty: 1,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: "",
      buy: "",
      diff: 0.95,
      diffCash: 307.23,
      end: 1.11,
      id: "21209..",
      inStore: "",
      name: "Кафе",
      net: 1,
      netDiff: 0.55,
      netStart: 1.66,
      netstart: "",
      start: 1.66,
      startRev: 1.768,
      tara: 0,
      tara1: 0.11,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: "",
      buy: "",
      diff: 6,
      diffCash: 36,
      end: 7.7,
      id: "21197..",
      name: "Мляко",
      net: 1,
      netDiff: 4.3,
      netStart: 12,
      netstart: "",
      start: 12,
      startRev: 12,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: ""
    },
    {
      bruto: "",
      bruto1: 1099,
      buy: "",
      diff: 0.25,
      diffCash: 150,
      end: 0.22,
      id: "21216..",
      inStore: "",
      name: "Нес кафе",
      net: 999,
      netDiff: -0.13,
      netStart: 0.085,
      netstart: "",
      start: 0.085,
      startRev: 185,
      tara: 70,
      tara1: 100,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 0,
      diffCash: 0,
      end: 12,
      id: "21201",
      inStore: "",
      name: "LaFesta",
      net: 1,
      netDiff: 2,
      netStart: 14,
      start: 14,
      startRev: 14,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: ""
    },
    {
      bruto: 0,
      bruto1: 1100,
      buy: "",
      diff: 0.01,
      diffCash: 2.4,
      end: 0.1,
      id: "21219",
      name: "Какао",
      net: 990,
      netDiff: -0.01,
      netStart: 0.095,
      netstart: "",
      start: 0.095,
      startRev: 205,
      tara: 0,
      tara1: 110,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 0,
      diffCash: 0,
      end: 173,
      id: "21205..",
      inStore: 80,
      name: "Чай",
      net: 1,
      netDiff: 7,
      netStart: 101,
      start: 180,
      startRev: 100,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 49,
      id: "21203",
      name: "Мед",
      net: 1,
      netDiff: 4,
      netStart: 53,
      start: 53,
      startRev: 53,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 24,
      id: "21202",
      name: "Сметана",
      net: 1,
      netDiff: 14,
      netStart: 38,
      start: 38,
      startRev: 38,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 120,
      diff: 144,
      diffCash: 259.2,
      end: 75,
      id: "21232",
      name: "Мин. Вода 0.5",
      net: 1,
      netDiff: 82,
      netStart: 37,
      start: 37,
      startRev: 37,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 24,
      diff: 96,
      diffCash: 172.8,
      end: 42,
      id: "21225",
      name: "Сода 0.5",
      net: 1,
      netDiff: 35,
      netStart: 53,
      start: 53,
      startRev: 53,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: -3,
      diffCash: -10.5,
      end: 23,
      id: "21221..",
      name: "Студен чай",
      net: 1,
      netDiff: 9,
      netStart: 32,
      start: 32,
      startRev: 32,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: -2,
      diff: 10,
      diffCash: 100,
      end: 18.9,
      id: "21236..",
      name: "Сок",
      net: 1,
      netDiff: 6.5,
      netStart: 27.4,
      start: 27.4,
      startRev: 27.4,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 77,
      diff: 187,
      diffCash: 411.4,
      end: 123,
      id: "21228..",
      name: "Кутийка",
      net: 1,
      netDiff: 115,
      netStart: 161,
      start: 161,
      startRev: 161,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 80,
      diff: -5,
      diffCash: -25,
      end: 60,
      id: "21235",
      name: "Гларус",
      net: 1,
      netDiff: 31,
      netStart: 11,
      start: 11,
      startRev: 11,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: -3,
      diff: 0,
      diffCash: 0,
      end: 10,
      id: "21234",
      name: "Red Bull",
      net: 1,
      netDiff: 10,
      netStart: 23,
      start: 23,
      startRev: 23,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 1,
      id: "6",
      name: "Ginger beer",
      net: 1,
      netDiff: 11,
      netStart: 12,
      start: 12,
      startRev: 12,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 110,
      diff: 186,
      diffCash: 651,
      end: 40,
      id: "21257, 22724",
      name: "Staropramen",
      net: 1,
      netDiff: 115,
      netStart: 45,
      start: 45,
      startRev: 45,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 160,
      diff: 358,
      diffCash: 1432,
      end: 23,
      id: "21256",
      name: "Stela artois",
      net: 1,
      netDiff: 193,
      netStart: 56,
      start: 56,
      startRev: 56,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: -4,
      diffCash: -20,
      end: 36,
      id: "22041",
      name: "Primator ALL",
      net: 1,
      netDiff: 9,
      netStart: 45,
      start: 45,
      startRev: 45,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: -3,
      diff: 0,
      diffCash: 0,
      end: 14,
      id: "5",
      name: "Приматор ТЪЩА",
      net: 1,
      netDiff: 2,
      netStart: 19,
      start: 19,
      startRev: 19,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 3,
      id: "21265",
      name: "Bernard Swing",
      net: 1,
      netDiff: 2,
      netStart: 5,
      start: 5,
      startRev: 5,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 12,
      diff: 40,
      diffCash: 240,
      end: 26,
      id: "21268",
      name: "Диво пиво",
      net: 1,
      netDiff: -1,
      netStart: 13,
      start: 13,
      startRev: 13,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 24,
      diff: 36,
      diffCash: 136.8,
      end: 31,
      id: "21258, 21262",
      name: "Heinecken; Leffe",
      net: 1,
      netDiff: 19,
      netStart: 26,
      start: 26,
      startRev: 26,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 40,
      diff: 117,
      diffCash: 585,
      end: 35,
      id: "21266, 22152",
      name: "Regent; Bernard svetlo",
      net: 1,
      netDiff: 72,
      netStart: 67,
      start: 67,
      startRev: 67,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 66,
      diff: 119,
      diffCash: 595,
      end: 1,
      id: "21264",
      name: "Corona",
      net: 1,
      netDiff: 67,
      netStart: 2,
      start: 2,
      startRev: 2,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: -6,
      diff: 0,
      diffCash: 0,
      end: 9,
      id: "21255",
      name: "Столично",
      net: 1,
      netDiff: 29,
      netStart: 44,
      start: 44,
      startRev: 44,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 6,
      diffCash: 30,
      end: 6,
      id: "21260, 21270",
      name: "G 330; Kilkenny",
      net: 1,
      netDiff: -3,
      netStart: 3,
      start: 3,
      startRev: 3,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 6,
      diffCash: 36,
      end: 2,
      id: "21261",
      name: "G 440",
      net: 1,
      netDiff: 7,
      netStart: 9,
      start: 9,
      startRev: 9,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 13,
      diffCash: 52,
      end: 6,
      id: "21772",
      name: "Schoeffer grapefruit",
      net: 1,
      netDiff: 2,
      netStart: 8,
      start: 8,
      startRev: 8,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 4,
      diffCash: 14,
      end: 5,
      id: "21267",
      name: "Claustaller",
      net: 1,
      netDiff: 5,
      netStart: 10,
      start: 10,
      startRev: 10,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 18,
      diff: 49,
      diffCash: 235.2,
      end: 8,
      id: "21271",
      name: "Schoefferhofer",
      net: 1,
      netDiff: 28,
      netStart: 18,
      start: 18,
      startRev: 18,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 10.5,
      diff: 19.9,
      diffCash: 497.5,
      end: 10,
      id: "21361, 21875, 21866",
      name: "Вино бут.",
      net: 1,
      netDiff: 10.5,
      netStart: 10,
      start: 10,
      startRev: 10,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0,
      id: "21885, 21364, 21874",
      name: "Вино чаши",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0,
      id: "4",
      name: "Вино бокс чаша",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 0,
      diffCash: 0,
      end: 1.8,
      id: "24567",
      name: "Savoy джин",
      net: 1,
      netDiff: 0.3,
      netStart: 2.1,
      start: 2.1,
      startRev: 2.1,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 0,
      diffCash: 0,
      end: 0.5,
      id: "21354, 21344",
      name: "Коняк; Ракия БГ",
      net: 1,
      netDiff: 0,
      netStart: 0.5,
      start: 0.5,
      startRev: 0.5,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0,
      id: "3",
      name: "Ракия Грапа",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 1,
      diff: 2,
      diffCash: 88,
      end: 1.95,
      id: "21294",
      name: "Мента",
      net: 1,
      netDiff: -0.2,
      netStart: 0.75,
      start: 0.75,
      startRev: 0.75,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 1235,
      bruto1: 1470,
      buy: "",
      diff: 0.02,
      diffCash: 1.76,
      end: 0.38,
      id: "21275..",
      name: "Smirnoff",
      net: 960,
      netDiff: 0.06,
      netStart: 0.44,
      start: 0.44,
      startRev: 1510,
      tara: 580,
      tara1: 510,
      taraQty: 1,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 1590,
      buy: "",
      diff: -0.6,
      diffCash: -52.8,
      end: 0.87,
      id: "21278..",
      inStore: "",
      name: "Absolut",
      net: 950,
      netDiff: 1.8,
      netStart: 2.67,
      start: 2.67,
      startRev: 4460,
      tara: 0,
      tara1: 640,
      taraQty: 0,
      taraQty1: 3
    },
    {
      bruto: 0,
      bruto1: 1540,
      buy: 1,
      diff: 1.38,
      diffCash: 121.44,
      end: 0.17,
      id: "21277",
      inStore: "",
      name: "Finlandia",
      net: 940,
      netDiff: 1.6,
      netStart: 0.77,
      start: 0.77,
      startRev: 1325,
      tara: 0,
      tara1: 600,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1160,
      bruto1: 1555,
      buy: 0,
      diff: 0.01,
      diffCash: 0.8,
      end: 0.9,
      id: "21283..",
      inStore: "",
      name: "Sobieski",
      net: 955,
      netDiff: 0.04,
      netStart: 0.94,
      start: 0.94,
      startRev: 1495,
      tara: 410,
      tara1: 600,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1270,
      bruto1: 1630,
      buy: "",
      diff: 1.83,
      diffCash: 161.04,
      end: 1.81,
      id: "21285",
      name: "Руски Стандарт",
      net: 940,
      netDiff: -0.38,
      netStart: 1.43,
      start: 1.43,
      startRev: 2720,
      tara: 600,
      tara1: 690,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1270,
      bruto1: "",
      buy: 0,
      diff: 0.7,
      diffCash: 77,
      end: 0.58,
      id: "2",
      name: "Reyka",
      net: 985.714,
      netDiff: -0.4,
      netStart: 0.18,
      start: 0.18,
      startRev: 755,
      tara: 580,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1170,
      bruto1: 1525,
      buy: 1.8,
      diff: 1.79,
      diffCash: 96.66,
      end: 0.79,
      id: "21414",
      name: "Житная",
      net: 945,
      netDiff: 3.84,
      netStart: 2.83,
      start: 2.83,
      startRev: 4415,
      tara: 490,
      tara1: 580,
      taraQty: "",
      taraQty1: 3
    },
    {
      bruto: 1095,
      bruto1: 1500,
      buy: 1.4,
      diff: 3.06,
      diffCash: 306,
      end: 0.23,
      id: "24553",
      name: "Gordon's",
      net: 965,
      netDiff: 2.29,
      netStart: 1.12,
      start: 1.12,
      startRev: 2155,
      tara: 460,
      tara1: 535,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1240,
      bruto1: 0,
      buy: 0.7,
      diff: 1.39,
      diffCash: 139,
      end: 0.73,
      id: "24554",
      name: "Tanquery",
      net: 957.143,
      netDiff: 0.26,
      netStart: 0.29,
      start: 0.29,
      startRev: 845,
      tara: 570,
      tara1: 0,
      taraQty: 2,
      taraQty1: 0
    },
    {
      bruto: 1190,
      bruto1: 1650,
      buy: 0,
      diff: 3.01,
      diffCash: 301,
      end: 0.7,
      id: "24551",
      name: "Beefeater",
      net: 950,
      netDiff: 0.94,
      netStart: 1.64,
      start: 1.64,
      startRev: 2955,
      tara: 550,
      tara1: 700,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1275,
      bruto1: 1690,
      buy: 0,
      diff: 1.07,
      diffCash: 128.4,
      end: 1.27,
      id: "24552",
      name: "Bombay Sapphire",
      net: 920,
      netDiff: 0.28,
      netStart: 1.55,
      start: 1.55,
      startRev: 2965,
      tara: 610,
      tara1: 770,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1260,
      bruto1: 0,
      buy: "",
      diff: 0.03,
      diffCash: 4.2,
      end: 0.47,
      id: "24556",
      name: "Hendrick's",
      net: 942.857,
      netDiff: 0.25,
      netStart: 0.72,
      start: 0.72,
      startRev: 1880,
      tara: 600,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1240,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.22,
      id: "24569",
      name: "Bulldog",
      net: 942.857,
      netDiff: 0,
      netStart: 0.22,
      start: 0.22,
      startRev: 785,
      tara: 580,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: "",
      buy: 0.7,
      diff: 2.3,
      diffCash: 46,
      end: 1.2,
      id: "13673",
      name: "Просеко",
      net: 1,
      netDiff: 0.75,
      netStart: 1.25,
      start: 1.25,
      startRev: 1.25,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 1120,
      bruto1: 1550,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.4,
      id: "21305",
      name: "Famouse Grouse",
      net: 950,
      netDiff: 0,
      netStart: 0.4,
      start: 0.4,
      startRev: 980,
      tara: 460,
      tara1: 600,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1050,
      bruto1: 1465,
      buy: 0,
      diff: 1.54,
      diffCash: 160.16,
      end: 2.01,
      id: "21304",
      name: "Johnnie Walker",
      net: 965,
      netDiff: -1.09,
      netStart: 0.92,
      start: 0.92,
      startRev: 1370,
      tara: 390,
      tara1: 500,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1050,
      bruto1: 1440,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.86,
      id: "21323",
      name: "Johnnie 12*",
      net: 940,
      netDiff: 0,
      netStart: 0.86,
      start: 0.86,
      startRev: 1690,
      tara: 380,
      tara1: 500,
      taraQty: 1,
      taraQty1: 1
    },
    {
      bruto: 1240,
      bruto1: 0,
      buy: 0,
      diff: 0.01,
      diffCash: 2,
      end: 0.31,
      id: "23556",
      name: "Gentleman Jack",
      net: 928.571,
      netDiff: -0.01,
      netStart: 0.3,
      start: 0.3,
      startRev: 875,
      tara: 590,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0,
      id: "21324",
      name: "",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 1070,
      bruto1: 1500,
      buy: 1,
      diff: 2.75,
      diffCash: 286,
      end: 1.93,
      id: "21296",
      name: "Jim Beam",
      net: 950,
      netDiff: -0.55,
      netStart: 0.38,
      start: 0.38,
      startRev: 915,
      tara: 410,
      tara1: 550,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 1175,
      bruto1: 1590,
      buy: 0,
      diff: 1.74,
      diffCash: 180.96,
      end: 1.83,
      id: "21297",
      name: "4 Roses",
      net: 955,
      netDiff: -1.11,
      netStart: 0.71,
      start: 0.72,
      startRev: 1320,
      tara: 520,
      tara1: 635,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1185,
      bruto1: 1490,
      buy: 0,
      diff: -0.08,
      diffCash: -10.4,
      end: 0.45,
      id: "21298",
      name: "Jack Daniels",
      net: 945,
      netDiff: 0.96,
      netStart: 1.41,
      start: 1.41,
      startRev: 2425,
      tara: 475,
      tara1: 545,
      taraQty: "",
      taraQty1: 2
    },
    {
      bruto: 0,
      bruto1: 1550,
      buy: 1.11,
      diff: 1.13,
      diffCash: 117.52,
      end: 1.19,
      id: "21309",
      name: "Paddy",
      net: 930,
      netDiff: 1.67,
      netStart: 1.75,
      start: 1.75,
      startRev: 2900,
      tara: 0,
      tara1: 620,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1175,
      bruto1: 1595,
      buy: 0,
      diff: 2.22,
      diffCash: 230.88,
      end: 0.62,
      id: "21306",
      name: "Jameson",
      net: 965,
      netDiff: 0.48,
      netStart: 1.1,
      start: 1.1,
      startRev: 2310,
      tara: 530,
      tara1: 630,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1290,
      bruto1: 0,
      buy: 0,
      diff: 1.39,
      diffCash: 166.8,
      end: 1.46,
      id: "21302",
      name: "John Power",
      net: 957.143,
      netDiff: -0.79,
      netStart: 0.67,
      start: 0.67,
      startRev: 1260,
      tara: 620,
      tara1: 0,
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 1230,
      bruto1: 1600,
      buy: 1,
      diff: -1.32,
      diffCash: -137.28,
      end: -1.4,
      id: "21307",
      name: "Bushmill's",
      net: 940,
      netDiff: 2.9,
      netStart: 0.5,
      start: 0.5,
      startRev: 1135,
      tara: 580,
      tara1: 660,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1300,
      bruto1: 1645,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.36,
      id: "21690",
      name: "Glenfiddich",
      net: 965,
      netDiff: 0.05,
      netStart: 0.41,
      start: 0.41,
      startRev: 1065,
      tara: 630,
      tara1: 680,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1220,
      bruto1: 0,
      buy: 0.7,
      diff: 0,
      diffCash: 0,
      end: 1.01,
      id: "21409",
      name: "Bush 10*",
      net: 942.857,
      netDiff: 0,
      netStart: 0.31,
      start: 0.31,
      startRev: 850,
      tara: 560,
      tara1: 0,
      taraQty: 2,
      taraQty1: ""
    },
    {
      bruto: 1220,
      bruto1: 1575,
      buy: 0,
      diff: 0.02,
      diffCash: 3.2,
      end: 0.38,
      id: "21325",
      name: "Black Bush ",
      net: 1000,
      netDiff: 0.03,
      netStart: 0.44,
      start: 0.415,
      startRev: 990,
      tara: 560,
      tara1: 575,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 1165,
      bruto1: 1640,
      buy: 0,
      diff: 0.98,
      diffCash: 98,
      end: 1.87,
      id: "21359, 21388, 21389",
      name: "Текила 2.00",
      net: 950,
      netDiff: 0.72,
      netStart: 2.59,
      start: 2.59,
      startRev: 4475,
      tara: 520,
      tara1: 690,
      taraQty: 0,
      taraQty1: 3
    },
    {
      bruto: 1600,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.1,
      id: "21360",
      name: "Текила 100%",
      net: 942.857,
      netDiff: 0,
      netStart: 0.1,
      start: 0.1,
      startRev: 1035,
      tara: 940,
      tara1: 0,
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 1285,
      bruto1: 0,
      buy: 0,
      diff: -0.02,
      diffCash: -3,
      end: 0.76,
      id: "21322",
      name: "Eldor 12",
      net: 978.571,
      netDiff: 0.02,
      netStart: 0.78,
      start: 0.78,
      startRev: 1945,
      tara: 600,
      tara1: 0,
      taraQty: 2,
      taraQty1: 0
    },
    {
      bruto: 1240,
      bruto1: 0,
      buy: 0,
      diff: 0.01,
      diffCash: 1.6,
      end: 0.01,
      id: "21319",
      name: "Eldor 15",
      net: 928.571,
      netDiff: 0.04,
      netStart: 0.05,
      start: 0.05,
      startRev: 640,
      tara: 590,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1180,
      bruto1: 1560,
      buy: 1,
      diff: 2.46,
      diffCash: 246,
      end: 2.06,
      id: "21314",
      name: "Havana",
      net: 930,
      netDiff: 0.14,
      netStart: 1.15,
      start: 1.2,
      startRev: 2355,
      tara: 510,
      tara1: 630,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 0,
      bruto1: 1450,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.84,
      id: "21317",
      name: "Santiago",
      net: 950,
      netDiff: 0,
      netStart: 0.84,
      start: 0.84,
      startRev: 1295,
      tara: 0,
      tara1: 500,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1410,
      bruto1: 0,
      buy: 0,
      diff: 0.01,
      diffCash: 1.4,
      end: 0.24,
      id: "21318",
      name: "El Dor 8*",
      net: 957.143,
      netDiff: 0.04,
      netStart: 0.28,
      start: 0.28,
      startRev: 1005,
      tara: 740,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1130,
      bruto1: 0,
      buy: 0,
      diff: -0.01,
      diffCash: -1,
      end: 0.36,
      id: "23683",
      name: "Brugal",
      net: 928.571,
      netDiff: 0.09,
      netStart: 0.45,
      start: 0.45,
      startRev: 1375,
      tara: 480,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 1480,
      buy: 0,
      diff: 1.12,
      diffCash: 100.8,
      end: 1.51,
      id: "21312",
      name: "Morgan",
      net: 960,
      netDiff: 0.31,
      netStart: 1.82,
      start: 1.82,
      startRev: 2765,
      tara: 520,
      tara1: 520,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1410,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.03,
      id: "23160",
      name: "El Dor 3*",
      net: 957.143,
      netDiff: 0,
      netStart: 0.03,
      start: 0.03,
      startRev: 770,
      tara: 740,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1410,
      bruto1: 0,
      buy: 0,
      diff: -0.01,
      diffCash: -1.2,
      end: 0.1,
      id: "22040",
      name: "El Dor 5*",
      net: 957.143,
      netDiff: 0.01,
      netStart: 0.11,
      start: 0.11,
      startRev: 840,
      tara: 740,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1540,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.02,
      id: "21771",
      name: "Angostura",
      net: 1071.429,
      netDiff: 0,
      netStart: 0.02,
      start: 0.02,
      startRev: 810,
      tara: 790,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1050,
      bruto1: 0,
      buy: 0,
      diff: 1.13,
      diffCash: 135.6,
      end: 1.17,
      id: "21320",
      name: "S.Jerry",
      net: 971.429,
      netDiff: -0.55,
      netStart: 0.62,
      start: 0.62,
      startRev: 960,
      tara: 370,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1230,
      bruto1: 1645,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.37,
      id: "21345",
      name: "Metaxa 5*",
      net: 945,
      netDiff: 0.1,
      netStart: 0.47,
      start: 0.47,
      startRev: 1015,
      tara: 570,
      tara1: 700,
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 1190,
      bruto1: 0,
      buy: 0.7,
      diff: 0,
      diffCash: 0,
      end: 0.71,
      id: "21346",
      name: "Hennessy",
      net: 950,
      netDiff: 0,
      netStart: 0.01,
      start: 0.01,
      startRev: 535,
      tara: 525,
      tara1: 0,
      taraQty: 2,
      taraQty1: 0
    },
    {
      bruto: 1170,
      bruto1: 1520,
      buy: 0,
      diff: 1.68,
      diffCash: 134.4,
      end: 1.97,
      id: "21350",
      name: "Узо",
      net: 945,
      netDiff: -1.1,
      netStart: 0.87,
      start: 0.87,
      startRev: 1400,
      tara: 520,
      tara1: 575,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1570,
      bruto1: 1560,
      buy: 5,
      diff: -0.94,
      diffCash: -84.6,
      end: 1.92,
      id: "21348, 21349",
      name: "Pernod; Ricard",
      net: 930,
      netDiff: 3.69,
      netStart: 0.62,
      start: 0.61,
      startRev: 1795,
      tara: 580,
      tara1: 630,
      taraQty: 3,
      taraQty1: 3
    },
    {
      bruto: 1430,
      bruto1: 0,
      buy: 0,
      diff: 0.02,
      diffCash: 2.8,
      end: 0.37,
      id: "21351",
      name: "Absente Fr.",
      net: 942.857,
      netDiff: 0.18,
      netStart: 0.55,
      start: 0.55,
      startRev: 1290,
      tara: 770,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 1580,
      buy: 0,
      diff: 1.66,
      diffCash: 99.6,
      end: 2.63,
      id: "21338..",
      name: "Martini",
      net: 1005,
      netDiff: -1.16,
      netStart: 1.47,
      start: 1.47,
      startRev: 3190,
      tara: 0,
      tara1: 575,
      taraQty: 0,
      taraQty1: 3
    },
    {
      bruto: 1210,
      bruto1: 1640,
      buy: 0,
      diff: 1.08,
      diffCash: 86.4,
      end: 1.67,
      id: "21343",
      name: "Campari",
      net: 1060,
      netDiff: -0.18,
      netStart: 1.49,
      start: 1.49,
      startRev: 2650,
      tara: 480,
      tara1: 580,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1230,
      bruto1: 1660,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.39,
      id: "21330",
      name: "Kahlua",
      net: 1110,
      netDiff: 0.13,
      netStart: 0.52,
      start: 0.52,
      startRev: 980,
      tara: 435,
      tara1: 550,
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 0,
      bruto1: 1500,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.16,
      id: "21332",
      name: "Malibu",
      net: 945,
      netDiff: 0,
      netStart: 0.16,
      start: 0.16,
      startRev: 705,
      tara: 0,
      tara1: 555,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 1450,
      buy: 0,
      diff: 1.5,
      diffCash: 120,
      end: 1.79,
      id: "21355",
      name: "Cachasa",
      net: 970,
      netDiff: -1.5,
      netStart: 0.29,
      start: 0.29,
      startRev: 760,
      tara: 420,
      tara1: 480,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1100,
      bruto1: 1470,
      buy: "",
      diff: -0.08,
      diffCash: -6.4,
      end: 1.68,
      id: "21333",
      name: "Bols",
      net: 1000,
      netDiff: 0.28,
      netStart: 1.96,
      start: 1.96,
      startRev: 3590,
      tara: 420,
      tara1: 470,
      taraQty: 3,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 1840,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.85,
      id: "21334",
      name: "Гренадин",
      net: 1235,
      netDiff: 0.09,
      netStart: 0.94,
      start: 0.94,
      startRev: 1735,
      tara: 600,
      tara1: 605,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 1390,
      bruto1: 1865,
      buy: 0,
      diff: 0.04,
      diffCash: 4.8,
      end: 0.11,
      id: "21335",
      name: "Коантро",
      net: 1035,
      netDiff: 0.07,
      netStart: 0.18,
      start: 0.18,
      startRev: 890,
      tara: 670,
      tara1: 830,
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 1500,
      bruto1: 1700,
      buy: 0,
      diff: 0.05,
      diffCash: 5,
      end: 0.51,
      id: "22725",
      name: "Tia Maria",
      net: 1005,
      netDiff: 0.04,
      netStart: 0.57,
      start: 0.55,
      startRev: 1110,
      tara: 515,
      tara1: 695,
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 1220,
      bruto1: 1765,
      buy: 0,
      diff: 1.57,
      diffCash: 125.6,
      end: 1.63,
      id: "21329",
      name: "Bailey's",
      net: 1105,
      netDiff: -1.17,
      netStart: 0.46,
      start: 0.46,
      startRev: 1145,
      tara: 495,
      tara1: 660,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 1340,
      bruto1: "",
      buy: 0.7,
      diff: -1.07,
      diffCash: -149.8,
      end: -0.3,
      id: "21331, 22039",
      name: "After Shock; Stroh",
      net: 1057.143,
      netDiff: 1.65,
      netStart: 0.67,
      start: 0.65,
      startRev: 2470,
      tara: 600,
      tara1: "",
      taraQty: 4,
      taraQty1: ""
    },
    {
      bruto: 1180,
      bruto1: 0,
      buy: 0,
      diff: 3.46,
      diffCash: 415.2,
      end: 3.46,
      id: "22986",
      name: "Tatratea",
      net: 985.714,
      netDiff: -3.46,
      netStart: 0,
      start: "",
      startRev: 0,
      tara: 490,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 1730,
      buy: 0,
      diff: 8.34,
      diffCash: 834,
      end: 2.18,
      id: "21336",
      name: "Jagermeister",
      net: 990,
      netDiff: -1.67,
      netStart: 0.51,
      start: "",
      startRev: 1250,
      tara: 605,
      tara1: 740,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 1290,
      bruto1: 1670,
      buy: 0,
      diff: 1.3,
      diffCash: 104,
      end: 0.46,
      id: "1",
      name: "Aperol",
      net: 1070,
      netDiff: 0.2,
      netStart: 0.66,
      start: "",
      startRev: 1295,
      tara: 600,
      tara1: 600,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 10,
      diffCash: 25,
      end: 6,
      id: "21376",
      name: "фъстък",
      net: 1,
      netDiff: 9,
      netStart: 15,
      start: 15,
      startRev: 15,
      tara: 0,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 21,
      diffCash: 84,
      end: 15,
      id: "21374, 21375",
      name: "лешник/бадем",
      net: 1,
      netDiff: -2,
      netStart: 13,
      start: 13,
      startRev: 13,
      tara: 0,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 1200,
      bruto1: 0,
      buy: "",
      diff: 0.05,
      diffCash: 7,
      end: 0.4,
      id: "23559",
      name: "Jack Honey",
      net: 1000,
      netDiff: 0.18,
      netStart: 0.59,
      start: 0.585,
      startRev: 1085,
      tara: 500,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 47,
      diff: 123,
      diffCash: 246,
      end: 0,
      id: "21390.., 21400.., 22760..",
      name: "коктейли",
      net: 1,
      netDiff: 47,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 30,
      diff: 98,
      diffCash: 294,
      end: 0,
      id: "21727..",
      name: "Фреш; лимонада",
      net: 1,
      netDiff: 30,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 1250,
      bruto1: 0,
      buy: 0,
      diff: 0.02,
      diffCash: 2.4,
      end: 0.64,
      id: "23554",
      name: "Самбука кафе",
      net: 1000,
      netDiff: 0.01,
      netStart: 0.66,
      start: 0.65,
      startRev: 1210,
      tara: 550,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1535,
      bruto1: 0,
      buy: 0.7,
      diff: 1.64,
      diffCash: 196.8,
      end: 0.92,
      id: "23553",
      name: "Скинос",
      net: 1050,
      netDiff: 0.36,
      netStart: 0.58,
      start: 0.58,
      startRev: 1415,
      tara: 800,
      tara1: 0,
      taraQty: 2,
      taraQty1: 0
    },
    {
      bruto: 1240,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0.27,
      id: "23615",
      name: "Maker's Mark",
      net: 957.143,
      netDiff: 0,
      netStart: 0.27,
      start: 0.27,
      startRev: 825,
      tara: 570,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 1490,
      bruto1: "",
      buy: 0,
      diff: 0.24,
      diffCash: 33.6,
      end: 0.28,
      id: "23649",
      name: "Monkey Shoulder",
      net: 928.571,
      netDiff: -0.09,
      netStart: 0.19,
      start: 0.19,
      startRev: 1250,
      tara: 840,
      tara1: "",
      taraQty: 1,
      taraQty1: ""
    },
    {
      bruto: 0,
      bruto1: 1680,
      buy: 0,
      diff: 0.02,
      diffCash: 2.08,
      end: 0.38,
      id: "21308",
      name: "Tullamore Dew",
      net: 980,
      netDiff: 0.21,
      netStart: 0.59,
      start: 0.59,
      startRev: 1260,
      tara: 0,
      tara1: 700,
      taraQty: "",
      taraQty1: 1
    },
    {
      bruto: 1135,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0,
      id: "23682",
      name: "Naked Grouse",
      net: 950,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 470,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: "",
      diff: 1,
      diffCash: 65,
      end: 0,
      id: "33",
      inStore: "",
      name: "ПРОМОЦИЯ Буш + 4 кена",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: "",
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: "",
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      diffCash: 0,
      end: 0,
      id: "22",
      name: "ПРОМОЦИЯ Джони Уокър + 4 кена",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: null,
      diffCash: null,
      end: 0,
      id: "new0",
      name: "new",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: null,
      diffCash: null,
      end: 0,
      id: "new1",
      name: "new",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 12,
      diff: 0,
      diffCash: 0,
      end: 9,
      id: "new54",
      inStore: 0,
      name: "Съмърсби",
      net: 1,
      netDiff: 14,
      netStart: 11,
      start: 11,
      startRev: 11,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 30,
      diff: 162,
      diffCash: 567,
      end: 5,
      id: "new55",
      inStore: 0,
      name: "Каменица",
      net: 1,
      netDiff: 73,
      netStart: 48,
      start: 48,
      startRev: 48,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: -5,
      diffCash: -25,
      end: 18,
      id: "new56",
      inStore: 0,
      name: "Чисто и Просто",
      net: 1,
      netDiff: 12,
      netStart: 30,
      start: 30,
      startRev: 30,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    },
    {
      bruto: 1120,
      bruto1: 1565,
      buy: 0,
      diff: 0.05,
      diffCash: 4,
      end: 1.14,
      id: "new53",
      inStore: 0,
      name: "Воздух",
      net: 950,
      netDiff: 0.5,
      netStart: 1.64,
      start: 1.64,
      startRev: 2785,
      tara: 0,
      tara1: 615,
      taraQty: 0,
      taraQty1: 2
    },
    {
      bruto: 1230,
      bruto1: 0,
      buy: 0,
      diff: 0.03,
      diffCash: 4.2,
      end: 0.54,
      id: 21316,
      inStore: 0,
      name: "Havana 7*",
      net: 914.286,
      netDiff: 0.02,
      netStart: 0.56,
      start: 0.56,
      startRev: 1120,
      tara: 590,
      tara1: 0,
      taraQty: 1,
      taraQty1: 0
    },
    {
      bruto: 0,
      bruto1: 1715,
      buy: 0,
      diff: 0.02,
      diffCash: 2,
      end: 0.13,
      id: "new57",
      inStore: 0,
      name: "Bickens",
      net: 935,
      netDiff: 0.2,
      netStart: 0.33,
      start: 0.33,
      startRev: 1090,
      tara: 0,
      tara1: 780,
      taraQty: 0,
      taraQty1: 1
    },
    {
      bruto: 0,
      bruto1: 0,
      buy: 0,
      diff: 0,
      end: 0,
      id: "tkpmmjmjn",
      inStore: 0,
      name: "newItem",
      net: 1,
      netDiff: 0,
      netStart: 0,
      start: 0,
      startRev: 0,
      tara: 0,
      tara1: 0,
      taraQty: 0,
      taraQty1: 0
    }
  ];

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
  public cashList = {};
  private revKeys = [];
  private newRevList = {};
  public firstLoad: boolean = true;
  private afs;
  private DbData;

  public containerName;
  changedFrom = "Local";
  conn;

  /* Login credentials    */
  /*                      */
  db_key: string = "test"; //"JulJuD8xEvE6sptbL3cT"
  storeName: string = "";
  areaID: number = 0;
  areaName: string = "loading data.....";

  // // Bilkova
  // api_key: string = "JulJuD8xEvE6sptbL3cT";
  // storeName: string = "barBilkova";
  // areaID: number = 0;
  // areaName: string = "Big_bar";

  // api_key: string = "wrVNHyTluyMt5odAO6eL";
  // storeName: string = "barKicks";
  // areaID: number = 0;
  // areaName: string = "barKicks_1";

  testData;

  constructor(
    public data: DataService,
    afs: AngularFirestore,
    private router: Router
  ) {
    this.revData[0] = {};

    this.db_key = localStorage.userID || 0;
    this.DbData = afs.collection("databases").doc(this.db_key);
    this.conn = this.DbData.snapshotChanges().subscribe(res => {
      const changedFrom = res.payload.metadata.hasPendingWrites
        ? "Local"
        : "Server";
      const data = res.payload.data();
      // console.log(res);

      // ToDO ask if new or add credetial to existing db
      if (!res.payload.exists) this.setNewStore();
      if (changedFrom == "Server" && data) this.setChangesFromServer(data);
    });

    this.revListInit();
    this.calculateSheets();
  }

  private setNewStore() {
    // console.log("newStore");

    var data = {};
    data["revData"] = this["revData"];
    data["cashData"] = this["cashData"];
    data["taraList"] = this["taraList"];
    data["storeData"] = this["storeData"];
    data["menuList"] = this["menuList"];
    // }

    this.DbData.set(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });
  }
  private revListInit() {
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

  public changeArea(areaID) {
    // console.log(areaID);

    if (this.revData[areaID]) this.areaID = areaID;
    this.router.navigateByUrl("area/" + areaID);
    this.revList = this.revData[this.areaID].data;
    this.areaName = this.storeData.areas[this.areaID].name;
    this.revListInit();
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

    //console.log(id);

    this.DbData.update(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });
  }

  private setChangesFromServer(data) {
    //var localSt = this.getLocalSt(this.storeName);

    //with Local Storage
    // this.menuList =
    //   data.menuList || localSt["menuList"] || this.menuList;
    // this.revData = data.revData || localSt["revData"] || this.revData;
    // this.revList = this.revData[0].data;
    // this.cashData =
    //   data.cashData || this.getLocalSt("taraList") || this.cashData;
    // this.cashList = this.cashData[this.areaID].data;
    // this.taraList =
    //   data.taraList ||
    //   this.getLocalSt("barBilkova_0").taraList ||
    //   this.taraList;
    // console.log(data.revData);
    // console.log(this.areaID);
    // no localStorage
    this.menuList = data.menuList || this.menuList;
    this.revData = data.revData || this.revData;
    this.revList = this.revData[this.areaID]
      ? this.revData[this.areaID].data
      : [];
    this.cashData = data.cashData || this.cashData;
    this.cashList = this.cashData[this.areaID]
      ? this.cashData[this.areaID].data
      : this.cashList;
    this.storeData = data.storeData || this.storeData;
    this.taraList = data.taraList || this.taraList;
    this.areaName = this.storeData.areas[this.areaID]
      ? this.storeData.areas[this.areaID].name
      : "";

    this.revListInit();
    this.calculateSheets();
  }

  public fStore(name = "revList"): void {
    var json: string;

    this.calculateSheets();
    var data = {};

    if (name == "revList") {
      data["revData"] = this["revData"] || [];
      data["revData"][this.areaID] = data["revData"][this.areaID] || {};
      data["revData"][this.areaID].data = this.revList;
    } else if (name == "cashList") {
      data["cashData"] = this["cashData"];
      data["cashData"][this.areaID] = data["cashData"][this.areaID] || {};
      data["cashData"][this.areaID].data = this.cashList;
    } else {
      data[name] = this[name];
    }
    console.log(data);

    this.DbData.update(JSON.parse(JSON.stringify(data))).catch(function(error) {
      console.error(error);
    });

    this.containerName = "";
  }

  // public localStore(): void {
  //   var json: string;

  //   this.calculateSheets();

  //   var name = ["menuList", "revData", "sumData", "taraData", "cashData"];
  //   var dataList = [
  //     "menuList",
  //     "revData",
  //     "sumSheetView",
  //     "taraList",
  //     "cashData"
  //   ];
  //   var sumData = {};
  //   this.containerName = "";
  //   dataList.forEach((data, idx) => {
  //     sumData[name[idx]] = JSON.parse(JSON.stringify(this[data]));

  //     // }
  //   });
  //   json = JSON.stringify(sumData);
  //   localStorage.setItem(
  //     this.storeName + "_" + this.areaID,
  //     json
  //     // CryptoJS.AES.encrypt(json, "secret key 123").toString()
  //   );
  // }

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
    if (!this.cashList[date]) return;

    this.cashItems.forEach((tab, idx) => {
      var tempCash: Array<any> = [];
      // var emptyRow = new cashItem(idx, "", 0, 0);
      tab.data.forEach((cashItem, id) => {
        tempCash = [];
        // console.log(this.cashList[date]);

        this.cashList[date].forEach(i => {
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
          if (date == this.revKeys[this.revKeys.length - 1])
            tempTara[id] = this.taraItemSums(
              this.tempSummary[tab.name][id],
              itm
            );

          // console.log(tempTara[id].netStart);

          this.tempSummary["sumTotal"] += Number(itm.sum) || 0;
        }
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
      return i.id == menuItem.id;
    })[0];

    if (!item) {
      item = new taraItem(menuItem.id);
      this.taraList.push(item);
    }
    // item.start = item.start || item.netStart;
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
    console.log("change");
  }
}
