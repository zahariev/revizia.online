import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @HostListener("document:keydown", ["$event"])
  onKeyDown(evt: KeyboardEvent) {
    if (
      // backSpace
      evt.which === 8 &&
      // cell edit
      (evt.target["nodeName"] !== "TD" &&
        //areaName edit
        evt.srcElement["id"] != "areaName" &&
        //tabName edit
        evt.srcElement["id"].indexOf("list") &&
        //storeName edit
        evt.srcElement["id"] != "storeName")
    ) {
      evt.preventDefault();
    }
  }
  constructor() {}
}
