export class Item {
  constructor(
    public id: string = '',
    public name: string = '',
    public cost: number,
    public qty: number = 1,
    public price: number = 0,
    public round: number = 0,
    public qtyBruto: number = 0,
    public markup: number = 0
  ) {
  }
}

export class reviziaItem {
  constructor(
    public id: string = '',
    public minus: number = 0,
    public mplus: number = 0,
    public starts: number = 0,
    public ends: number = 0
  ) {
  }
}

export class taraItem {
  constructor(
    public id: string = '',
    public name: string = '',
    public net: number = 0,
    public bruto: number = 0,
    public bruto1: number = 0,
    public tara: number = 0,
    public tara1: number = 0,
    public taraQty: number = 0,
    public taraQty1: number = 0,
    public start: number = 0,
    public buy: number = 0,
    public end: number = 0,
    public diff: number = 0,
    public diffCash: number = 0,
    public inStore: number = 0,
    public netStart: number = 0,
    public netDiff: number = 0,
    public startRev: number = 0
  ) {
  }
}

export class cashItem {
  constructor(
    public tabIdx: number,
    public name: string = '',
    public sum: number,
    public suma: number = 1,
    public id: number = Number(
      Date.now()
        .toString()
        .slice(7) +
      '' +
      Math.floor(Math.random() * 10000)
    )
  ) {
  }
}

export class Store {
  constructor(
    public name: string = '',
    public areas: { id: number; name: string }[] = [],
    public managedDBs: {} = {}
  ) {
  }
}
