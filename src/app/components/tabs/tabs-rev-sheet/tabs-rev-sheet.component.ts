import { Component, OnInit, Input } from "@angular/core";
import { RevService } from "app/shared/services/rev.service";

@Component({
  selector: "tabs-rev-sheet",
  templateUrl: "./tabs-rev-sheet.component.html",
  styleUrls: ["./tabs-rev-sheet.component.css"]
})
export class TabsRevSheetComponent implements OnInit {
  editable: boolean;
  @Input() date: any;

  constructor(public data: RevService) {
    // console.log(data.menuList);
    // this.viewList = data.menuList;
    this.editable = true;
  }
  ngOnInit() {}
}
