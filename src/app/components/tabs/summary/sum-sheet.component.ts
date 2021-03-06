import {Component, Input} from '@angular/core';
import {RevService} from 'app/shared/services/rev.service';

import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'tabs-sum-sheet',
  templateUrl: './sum-sheet.component.html',
  styleUrls: ['./sum-sheet.component.css']
})
export class TabsSumSheetComponent {
  editable: boolean;
  @Input() date: any;
  selectedIndex: number;

  constructor(public data: RevService) {
    this.editable = true;
    this.selectedIndex = data.tabSelectedIdx;
  }

  ngOnInit() {
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabSelectedIdx = tabChange.index;

    var mlist = document.getElementById('sumTab' + tabChange.index);

    if (mlist) {
      mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    }
  }
}
