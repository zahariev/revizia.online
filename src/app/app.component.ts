import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @HostListener("document:keydown", ["$event"])
  onKeyDown(evt: KeyboardEvent) {
    console.log(evt);

    if (
      evt.which === 8 &&
      (evt.target["nodeName"] !== "TD" && evt.target["nodeName"] !== "DIV")
    ) {
      evt.preventDefault();
    }
  }
  constructor() {}
}
