import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "cash-sheet",
  templateUrl: "./cash-sheet.component.html",
  styleUrls: ["./cash-sheet.component.css"]
})
export class CashSheetComponent implements OnInit {
  @Input()
  data;
  constructor() {}

  ngOnInit() {}
}
