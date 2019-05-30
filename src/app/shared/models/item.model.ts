export class Item {
  constructor(
    public id: number = 0,
    public name: string = "",
    public cost: number,
    public qty: number = 1,
    public price: number = 0,
    public round: number = 0
  ) {}
}
