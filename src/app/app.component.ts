import { Component, Input, HostBinding } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rev";
  date;
  showCash = false;
  buttonName = "CashOut";

  ngAfterViewInit() {}

  toggleCashSheet() {
    this.showCash = !this.showCash;
    this.buttonName = this.showCash ? "Revizia" : "CashOut";
  }
}
