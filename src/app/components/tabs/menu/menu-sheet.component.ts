import {Component, OnInit, ElementRef} from '@angular/core';
import {RevService} from 'app/shared/services/rev.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragHandle
} from '@angular/cdk/drag-drop';
import {TabsCashSheetComponent} from '../cash-edit/cash-sheet.component';

import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'tabs-menu-sheet',
  templateUrl: './menu-sheet.component.html',
  styleUrls: ['./menu-sheet.component.css']
})
export class TabsMenuSheetComponent implements OnInit {
  // viewList;
  editable: boolean;
  mapTabToScroll = {};
  activeEl: any;
  contentChange: Boolean = false;
  columnList = [
    {columnName: 'id', name: 'id', format: 'number', editable: true},
    {
      columnName: 'Име',
      name: 'name',
      format: 'string',
      editable: true
    },

    {
      columnName: 'цена',
      name: 'price',
      format: 'BGN',
      editable: true
    },

    {
      columnName: 'колич.',
      name: 'qty',
      format: 'number',
      editable: true
    },
    {
      columnName: 'закр.',
      name: 'round',
      format: 'number',
      editable: true
    },
    {
      columnName: 'бр.в литър',
      name: 'qtyBruto',
      format: 'number',
      editable: true
    },
    {
      columnName: 'дост.Цена',
      name: 'cost',
      format: 'number',
      editable: true
    }
  ];

  simpleModeColumns = ['name', 'price', 'cost'];

  constructor(public data: RevService) {
    // this.viewList = data.menuList;
    this.editable = true;

    // console.log("init");
  }

  ngOnInit() {
    // this.selectedIndex = 1;
    // this.data.tabSelectedIdx = 0;
  }

  onSelectedTabChange(tabChange: MatTabChangeEvent) {
    // remove selection text
    var selection = window.getSelection();
    selection.removeAllRanges();
    // Maintain scroll position of the last scrolled tab idx
    this.data.tabSelectedIdx = tabChange.index;
    var mlist = document.getElementById('menuTab' + tabChange.index);

    if (mlist) {
      mlist.parentElement.scrollTo(0, this.data.tabScrollPos[tabChange.index]);
    }
  }

  onInput(ev) {
    this.contentChange = true;
    // console.log(ev);
  }

  onBlur(idx, event) {
    // console.log("blur");
    var el = event.target;
    el.contentEditable = 'false';
    this.activeEl = 0;

    var value = el.innerText;
    value = value.replace(/\r?\n|\r\s/g, '');

    // console.log(this.data.menuList[idx].name);

    if (value.trim() != '') {
      this.data.menuList[idx].name = value;
    } else {
      this.data.menuList[idx].name = ' . . .';
    }
    //console.log(value);
    // this.viewList = this.data.menuList;
    // this.data.localStore();
    this.data.fStore('menuList');
  }

  onClick(idx: any, event: any) {
    if (this.activeEl == 'select') {
      this.makeEditable(event.target);
      // event.preventDefault();
    } else if (this.activeEl == event.target) {
      this.selectText(event.target);
      this.activeEl = 'select';
      event.preventDefault();
    } else {
      this.activeEl = event.target;
    }
  }

  makeEditable(el) {
    if (!this.editable) {
      return;
    }
    el.contentEditable = 'true';
    this.activeEl = 'editable';
  }

  selectText(cell = document.activeElement) {
    // console.log("select text");
    if (!this.editable) {
      return;
    }
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
    var selection;
    // console.log(event);
    switch (event.key) {
      case 'Enter':
        if (el.contentEditable == 'true') {
          selection = window.getSelection();
          selection.removeAllRanges();
          el.contentEditable = 'false';
        }

        break;

      case 'ArrowLeft':
        if (this.activeEl != 'editable') {
          break;
        }
        selection = window.getSelection();
        try {
          selection.collapse(el.firstChild, selection.focusOffset - 1);
        } catch (error) {
        }
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'ArrowRight':
        if (this.activeEl != 'editable') {
          break;
        }
        selection = window.getSelection();
        try {
          selection.collapse(el.firstChild, selection.focusOffset + 1);
        } catch (error) {
        }
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Escape':
        selection = window.getSelection();
        selection.removeAllRanges();
        event.target.innerText = this.data.menuList[idx].name;
        event.preventDefault();

        el.contentEditable = 'false';
        //this.focusNextElement(el, 0);
        break;

      case 'Meta':
      case 'Control':
      case 'Shift':
      case ' ':
        break;
      default:
        if (this.activeEl != 'editable') {
          this.selectText();
        }
        this.makeEditable(el);
      // el.focus();
      // setTimeout(el.focus(), 100);
    }
  }

  addTab() {
    this.data.addMenuTab();
  }

  // dropp(ev) {
  //   console.log(ev);
  // }
  // dropItem(event: CdkDragDrop<any>, t: MatTabGroup): void {
  //   const arr = this.data.menuList;
  //   console.log(event);
  //   return;
  //   var previousIndex = parseInt(
  //     event.previousContainer.id.replace("list-", "")
  //   );
  //   var currentIndex = parseInt(event.container.id.replace("list-", ""));
  //   console.log(previousIndex + "->" + currentIndex);
  //   moveItemInArray(arr, previousIndex, currentIndex);
  //   this.data.fStore("menuList");
  //   // this.gridInit();
  // }
}
