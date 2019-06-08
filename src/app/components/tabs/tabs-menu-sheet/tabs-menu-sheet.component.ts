import { Component, OnInit } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

@Component({
  selector: "tabs-menu-sheet",
  templateUrl: "./tabs-menu-sheet.component.html",
  styleUrls: ["./tabs-menu-sheet.component.css"]
})
export class TabsMenuSheetComponent implements OnInit {
  viewList;
  editable: boolean;

  constructor(public data: RevService) {
    // console.log(data.menuList);
    this.viewList = data.menuList;
    this.editable = true;
  }

  ngOnInit() {}
}
