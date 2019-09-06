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
    //const param = this.route.snapshot.queryParams["id"];
    //const routeParam = this.route.paramMap["params"]["id"];
    this.route.paramMap.subscribe(params => {
      // console.log(this.data.revData);
      if (this.data.revData[params["params"]["id"]])
        setTimeout(this.data.changeArea(params["params"]["id"]), 1000);
      //   this.data.revList = area.data;
      //   this.data.areaName = area.name;
      // }
    });
  }

  ngAfterViewInit() {
    if (this.data._simpleMode) {
      this.showAllTabs = false;
      setTimeout(() => {
        this.data.revKeys = this.data.revKeys.slice(-2);
        // console.log(this.data.revKeys);
      }, 1000);
    }
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // this.data.fStore(this.data.containerName);

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
        this.selectText(el);
        this.makeEditable(el);

        event.preventDefault();

        break;
      case "Escape":
        event.target.innerText = this[property];
        event.preventDefault();
        break;

      case "Meta":
      case "Control":

      case "Shift":

      default:
        if (this.activeEl != "editable") this.selectText();
        this.makeEditable(el);
        setTimeout(el.focus(), 10);
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

  selectText(cell = document.activeElement) {
    if (!this.editable) return;
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
    console.log(name);
    if (this.contentChange) this.data.changeAreaName(name);

    event.target.contentEditable = "false";
    event.preventDefault();
  }

  changeStoreName(property: string, el: any) {
    this.data.fStore("storeData");
    this.contentChange = false;
  }

  makeEditable(el) {
    // if (!this.editable) return;
    el.contentEditable = "true";
    this.activeEl = "editable";
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
