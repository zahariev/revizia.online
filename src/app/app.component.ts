import { Component, Input, HostBinding } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rev";

  fontSize: number = 1;
  ngAfterViewInit() {
    this.fontSize = parseFloat(localStorage.getItem("zoom")) || this.fontSize;
    document.body.style.fontSize = this.fontSize.toString() + "rem";
    document.body.style.lineHeight = (this.fontSize - 0.5).toString() + "rem";
  }

  zoomIn() {
    console.log("+");
    this.fontSize += 0.1;
    document.body.style.fontSize = this.fontSize + "em";
    document.body.style.lineHeight = this.fontSize - 0.5 + "em";
    localStorage.setItem("zoom", this.fontSize.toString());
  }
  zoomOut() {
    this.fontSize -= 0.1;
    document.body.style.fontSize = this.fontSize + "em";
    document.body.style.lineHeight = this.fontSize - 0.5 + "em";
    localStorage.setItem("zoom", this.fontSize.toString());
  }
}
