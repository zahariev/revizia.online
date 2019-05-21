import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "cash-tab",
  templateUrl: "./cash.component.html",
  styleUrls: ["./cash.component.css"]
})
export class CashComponent implements OnInit {
  data = {
    deliveries: {},
    wages: {},
    others: {}
  };
  constructor() {}

  ngOnInit() {}
}
