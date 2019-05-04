import { Component } from "@angular/core";

@Component({
  selector: "table-editable",
  templateUrl: "./table-editable.component.html",
  styleUrls: ["./table-editable.component.css"]
})
export class TableEditableComponent {
  editField: string;
  itemList: Array<any> = [
    {
      id: 0,
      name: "Aurelia Vega",
      minus: 30,
      mplus: 30,
      starts: "2110",
      ends: 0
    },
    {
      id: 1,
      name: "Aurelia Vega",
      minus: 30,
      mplus: 30,
      starts: "2110",
      ends: 0
    },
    {
      id: 2,
      name: "Aurelia Vega",
      minus: 30,
      mplus: 30,
      starts: "1240",
      ends: 0
    },
    {
      id: 3,
      name: "Aurelia Vega",
      minus: 30,
      mplus: 30,
      starts: "4030",
      ends: 0
    },
    {
      id: 4,
      name: "Aurelia Vega",
      minus: 30,
      mplus: 30,
      starts: "1212",
      ends: 0
    },
    {
      id: 5,
      name: "Aurelia Vega",
      minus: 30,
      mplus: 30,
      starts: "2240",
      ends: 0
    }
  ];
  nextFocus: any;
  revList: Array<any> = [];
  focussableElements: any;

  fontSize: number;
  focus: any;
  constructor() {
    this.revList = localStorage.revList
      ? JSON.parse(localStorage.revList)
      : this.itemList;
  }

  ngAfterViewInit() {
    this.fontSize = parseFloat(localStorage.getItem("zoom")) || this.fontSize;
    // console.log(this.fontSize);
    document.body.style.fontSize = this.fontSize.toString() + "rem";
  }

  updateList(item, property: string, event: any) {
    const editValue = event.target.textContent;
    console.log(editValue);
    this.revList[item.id][property] = editValue;
    localStorage.revList = JSON.stringify(this.revList);
  }

  onBlur(item, elName, event) {}

  onFocus(item, event) {
    this.focus = event.target;
  }

  onEdit() {
    window.setTimeout(
      () => document.activeElement.execCommand("selectAll", false, null),
      1
    );
  }

  keyUp(item, property: string, event: any) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return;
        break;
    }
  }

  beforeInput(event) {
    console.log(event);
  }

  keyDown(item, property: string, event: any) {
    // console.log(event);
    //this.editField = event.target.textContent;

    switch (event.key) {
      case "Enter":
        this.focusNextElement(event.target, 3);
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.focusNextElement(event.target, -1);
        break;
      case "ArrowUp":
        this.focusNextElement(event.target, -3);
        break;
      case "ArrowDown":
        this.focusNextElement(event.target, 3);
        break;
      case "ArrowRight":
        this.focusNextElement(event.target, 1);
        break;
    }
  }

  zoomIn() {
    this.fontSize += 0.1;
    document.body.style.fontSize = this.fontSize + "em";
    localStorage.setItem("zoom", this.fontSize.toString());
  }
  zoomOut() {
    this.fontSize -= 0.1;
    document.body.style.fontSize = this.fontSize + "em";
    localStorage.setItem("zoom", this.fontSize.toString());
  }

  focusNextElement(el, i = 1) {
    this.focussableElements = document.querySelectorAll("[tabindex]");
    var index = Array.from(this.focussableElements).indexOf(el);
    console.log(index);
    if (index > -1) {
      var nextElement =
        this.focussableElements[index + i] || this.focussableElements[index];
      nextElement.focus();
    }
  }
}
