import { Component, OnInit, ElementRef } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute } from "@angular/router";

import { RevService } from "app/shared/services/rev.service";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent {
  title = "rev";
  editable: Boolean;
  showDatePicker: Boolean;
  el;
  data;
  tabs = [];
  buttonName = "CashOut";
  activeEl;
  contentChange;

  areaName;
  storeName;

  showMenuTab: boolean = true;
  showCashTab: boolean = true;
  showTaraTab: boolean = true;
  showSummaryTab: boolean = true;
  showAllTabs: boolean = true;
  // _simple: boolean = true;

  constructor(data: RevService, el: ElementRef, private route: ActivatedRoute) {
    this.el = el;
    this.data = data;
    this.tabs = this.data.revKeys;
    this.editable = true;
    if (this.data._simpleMode) {
      this.showAllTabs = false;

      this.data.revKeys = this.data.revKeys.slice(-2);
    }

    this.areaName = data.areaName;
    this.storeName = data.storeName;
    // console.log(this.data);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //check if area exists
      if (this.data.revData[params["params"]["id"]])
        setTimeout(this.data.changeArea(params["params"]["id"]), 50);
      // }
    });
  }

  ngAfterViewInit() {
    if (this.data._simpleMode) {
      this.showAllTabs = false;
      setTimeout(() => {
        this.data.revKeys = this.data.revKeys.slice(-2);
        // console.log(this.data.revKeys);
      }, 100);
    }
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // this.data.fStore(this.data.containerName);

    this.data.activeDateIdx = this.showAllTabs
      ? tabChange.index - 4
      : tabChange.index - 2;
    this.data.activeDate = Object.keys(this.data.revList)[
      this.data.activeDateIdx
    ];
    this.data.activeTabIdx = tabChange.index;

    // console.log(this.data.activeDate);
    // tab selector in place
    window.dispatchEvent(new Event("resize"));

    var scrollTab;
    var scrollPos = this.data.tabScrollPos[this.data.tabSelectedIdx];
    // console.log(tabChange);
    scrollTab =
      document.getElementById("revTab" + this.data.tabSelectedIdx) ||
      document.getElementById("menuTab" + this.data.tabSelectedIdx) ||
      document.getElementById("sumTab" + this.data.tabSelectedIdx) ||
      document.getElementById("taraTab" + this.data.tabSelectedIdx);

    if (scrollTab) {
      scrollTab.parentElement.scrollTo(0, scrollPos);
    } else {
    }
  }

  onClick(event: any) {
    if (this.activeEl == "select") {
      this.makeEditable(event.target);
      // event.preventDefault();
    } else if (this.activeEl == event.target) {
      this.selectText(event.target);
      this.activeEl = "select";
    } else {
      this.activeEl = event.target;
    }
  }

  keyDown(property: string, event: any) {
    // console.log(event);
    var el = event.target;
    switch (event.key) {
      case "Enter":
        if (this.activeEl != "editable") {
          this.selectText();

          this.makeEditable(el);
        } else {
          event.preventDefault();
          event.target.blur();
        }
        break;
      case "Escape":
        event.target.innerText = this[property];
        event.preventDefault();
        break;

      case "Meta":
      case "Control":

      case "Shift":
        break;
      default:
        // if (this.activeEl != "editable") this.selectText();
        this.makeEditable(el);
      //setTimeout(el.focus(), 10);
    }
  }

  onInput(event) {
    this.contentChange = true;
  }

  keyUp(event: any) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return true;
        break;
    }

    return true;
  }

  //
  // edit names events
  //

  selectText(cell = document.activeElement) {
    // if (!this.editable) return;
    var range, selection;
    if (this.activeEl == "select") this.activeEl = "editable";
    // const input = window.document;
    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(cell);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  changeAreaName(event) {
    var name = event.target.innerText;
    // console.log(name);
    if (this.contentChange) this.data.changeAreaName(name);

    event.target.contentEditable = "false";
    event.preventDefault();
  }

  changeStoreName(event: any) {
    var name = event.target.innerText;
    // console.log(name);
    if (this.contentChange) this.data.changeStoreName(name);
    event.target.contentEditable = "false";
    event.preventDefault();
  }

  makeEditable(el) {
    // if (!this.editable) return;
    el.contentEditable = "true";
    this.activeEl = "editable";
  }

  //
  // Menu events
  //

  public contextMenuOpen(ev) {
    // console.log("menu open");
    ev.preventDefault();
  }
  public dayOff(e): void {
    this.data.revList[this.data.activeDate].forEach(i => {
      i.ends = i.mplus + i.minus + i.starts;
    });
    this.data.fStore();
  }

  public removeDayTab(e): void {
    confirm(
      "You Are Going to DELETE this sheet!!! \n are you shure, please confirm"
    )
      ? this.data.removeRevSheet()
      : 0;
  }

  addTab(ev) {
    // if (!this.data.newDayTab())
    {
      // pop calendar contorll
      this.showDatePicker = !this.showDatePicker;
    }
  }

  areaChange(ev, areaID) {
    this.data.changeArea(areaID);
  }

  areaNew(ev) {
    this.data.areaNew(ev);
  }

  removeMenuTab() {
    confirm(
      "You Are Going to DELETE this tab! \n are you shure, please confirm \n"
    )
      ? this.data.removeMenuTab()
      : 0;
  }

  public newPeriod(e) {
    confirm(
      "You Are Going to DELETE All Sheets!!! \n Are you shure, please confirm !"
    )
      ? this.data.newPeriod()
      : 0;

    // this.data.newPeriod();
  }
  public savePeriod(e) {}

  //
  //

  onDateChanged(date) {
    this.showDatePicker = false;
    this.data.newDayTab(date);
    // console.log(date);
  }

  toggleHideTabs(e) {
    // return;
    this.showAllTabs = !this.showAllTabs;
  }
}
