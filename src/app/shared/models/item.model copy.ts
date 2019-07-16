export class Item {
  constructor(
    public id: string = "",
    public name: string = "",
    public cost: number,
    public qty: number = 1,
    public price: number = 0,
    public round: number = 0
  ) {}
}
