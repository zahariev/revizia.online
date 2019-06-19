import { Component, OnInit, ElementRef } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "tabs-menu-sheet",
  templateUrl: "./tabs-menu-sheet.component.html",
  styleUrls: ["./tabs-menu-sheet.component.css"]
})
export class TabsMenuSheetComponent implements OnInit {
  viewList;
  editable: boolean;
  mapTabToScroll = {};
  activeEl: any;
  contentChange: Boolean = false;

  constructor(public data: RevService) {
    this.viewList = data.menuList;
    this.editable = true;
  }

  ngOnInit() {
    // this.selectedIndex = 1;
    this.data.tabSelectedIdx = 0;
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // remove selection text
    var selection = window.getSelection();
    selection.removeAllRanges();
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabSelectedIdx = tabChange.index;
    var mlist = document.getElementById("menuTab" + tabChange.index);

    if (mlist) {
      mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    }
  }

  onInput(ev) {
    this.contentChange = true;
  }

  onBlur(idx, event) {
    // console.log("blur");
    var el = event.target;
    el.contentEditable = "false";
    this.activeEl = 0;
    // this.updateList(idx, el);
  }

  onClick(idx: any, event: any) {
    if (this.activeEl == "select") {
      this.makeEditable(event.target);
      // event.preventDefault();
    } else if (this.activeEl == event.target) {
      this.selectText(event.target);
      this.activeEl = "select";
      event.preventDefault();
    } else {
      this.activeEl = event.target;
    }
  }

  makeEditable(el) {
    if (!this.editable) return;
    el.contentEditable = "true";
    this.activeEl = "editable";
  }

  selectText(cell = document.activeElement) {
    // console.log("select text");
    if (!this.editable) return;
    var range, selection;
    // if (this.activeEl == "select") this.activeEl = "editable";
    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(cell);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  keyDown(idx, event: any) {
    // console.log(event);
    var el = event.target;
    // console.log(event);
    switch (event.key) {
      case "Enter":
        {
          this.selectText(el);
          this.makeEditable(el);
        }

        break;

      case "ArrowLeft":
        //  if (this.activeEl != "editable") this.focusNextElement(el, -1);
        break;
      case "ArrowRight":
        //  if (this.activeEl != "editable") this.focusNextElement(el, 1);
        break;
      case "Escape":
        var selection = window.getSelection();
        selection.removeAllRanges();
        event.target.innerText = this.data.menuList[idx].name;
        event.preventDefault();
        //this.focusNextElement(el, 0);
        break;

      case "Meta":
      case "Control":
      case "Shift":
      case " ":
        break;
      default:
        if (this.activeEl != "editable") this.selectText();
        this.makeEditable(el);
      // el.focus();
      // setTimeout(el.focus(), 100);
    }
  }

  addTab() {
    this.data.addMenuTab();
  }
}
