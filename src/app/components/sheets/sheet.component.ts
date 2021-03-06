import { Component, OnInit, ElementRef } from '@angular/core';

import { moveItemInArray } from '@angular/cdk/drag-drop';

import { RevService } from 'app/shared/services/rev.service';

// tslint:disable-next-line: no-console
const log = console.log;

@Component({
  selector: 'app-sheet',
  template: 'NO UI TO BE FOUND HERE!'
})


export class SheetComponent implements OnInit {
  focusableElements: any;
  dataList;
  history: Array<any> = [];
  date;
  containerName;
  activeEl;
  tabIdx;
  editable;
  contentChange: boolean = false;
  columnList = { length: 0 };
  row: number = 0;
  ably;

  constructor(public dat: RevService, public el: ElementRef) {
    this.ably = dat.ably;
  }

  ngOnInit() {
  }

  updateList(itm, property: string, el: any) {
    this.gridInit();


    this.dat.firstLoad = false;
    const itemExists = this.dataList.filter(i => {
      return i.id == itm.id;
    })[0];
    const item = itemExists || JSON.parse(JSON.stringify(itm));

    // format edited text field
    let value = el.innerText + '';
    el.innerText = '';
    value = value.replace(/\r?\n|\r\s/g, '');

    // log('prop:' + property);
    // log('val:' + value);
    // log('sheet:' + this.containerName);
    const id: number = itm.id || 0;
    this.dat.send_msg('update', this.containerName, itm.id, property, value)

    if (this.contentChange) {
      const oldItem = JSON.parse(JSON.stringify(item));
      this.history.push(oldItem);
      item[property] = Number(value) || value;
      el.innerText = value;
    } else {
      // not to double values in text filed on chrome
      el.innerHTML = item[property] || '';
    }
    //
    // console.log(item);
    // console.log(this.containerName);
    // console.log(value);

    // this.dat.calculateSheets();
    // this.dat.localStore();

    this.dat.containerName = this.containerName;
    this.dat.fStore(this.dat.containerName);
    // this.dat.pgStore(this.containerName, item, this.date)
    this.contentChange = false;
  }

  gridInit() {
  }

  onInput(event) {
    // console.log(event);
    this.contentChange = true;
  }

  onBlur(item, colName, event) {
    const el = event.target;
    // console.log(el.innerText);
    if (colName == 'id') {
      const oldID = item.id;
      // this.updateList(item, colName, el);

      // this.updateId(oldID, item.id);
    } else if (this.contentChange) {
      this.updateList(item, colName, el);
    }
    this.gridInit();
    el.contentEditable = 'false';
    event.preventDefault();
  }

  updateId(id, value) {
    const db = localStorage.getItem(this.dat.storeName + this.dat.areaID);

    // console.log(db.replace(/"id":" + id + "/g, '"id":"' + value + '"'));
  }

  onClick(item: any, elName: string, event: any) {
    if (this.activeEl == 'select') {
      this.makeEditable(event.target);
      // event.preventDefault();
    } else if (this.activeEl == event.target) {
      this.selectText(event.target);
      this.activeEl = 'select';
    } else {
      this.activeEl = event.target;
    }
  }

  keyDown(item, property: string, event: any) {
    // console.log(event);
    let el = event.target;
    const row = this.row || this.columnList.length;
    // console.log(event.key);
    switch (event.key) {
      case 'Enter':
        if (this.activeEl == 'editable') {
          this.focusNextElement(el, row); // colummnList.length

          event.preventDefault();
        } else {
          this.selectText(el);
          this.makeEditable(el);

          event.preventDefault();
        }

        break;

      case 'ArrowUp':
        this.focusNextElement(el, -row);
        break;
      case 'ArrowDown':
        this.focusNextElement(el, row);
        break;
      case 'ArrowLeft':
        if (this.activeEl != 'editable') {
          this.focusNextElement(el, -1);
        }
        break;

      case 'ArrowRight':
        if (this.activeEl != 'editable') {
          this.focusNextElement(el, 1);
        }
        break;
        // case " ":
        this.selectText(el);
        this.makeEditable(el);

        event.preventDefault();
        break;
      case 'Tab':
        el = this.focusNextElement(el, 1);

        if (this.activeEl != 'editable') {
          this.selectText();
        }
        this.makeEditable(el);
        setTimeout(el.focus(), 10);
        event.preventDefault();
        break;
      case 'Escape':
        event.target.innerText = item[property];
        event.preventDefault();
        this.focusNextElement(el, 0);
        break;
      case 'z':
        if (event.ctrlKey || event.metaKey) {
          this.undoValue();
        } else {
          if (this.activeEl != 'editable') {
            this.selectText();
          }
          this.makeEditable(el);
          setTimeout(el.focus(), 10);
        }
        break;
      case 'Meta':
      case 'Control':

      case 'Shift':

      default:
        if (this.activeEl != 'editable') {
          this.selectText();
        }
        this.makeEditable(el);
        setTimeout(el.focus(), 10);
    }
  }

  keyUp(item, property: string, event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      return true;
    }

    return true;
  }

  selectText(cell = document.activeElement) {
    if (!this.editable) {
      return;
    }
    let range;
    let selection;
    if (this.activeEl == 'select') {
      this.activeEl = 'editable';
    }
    // const input = window.document;
    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(cell);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  makeEditable(el) {
    if (!this.editable) {
      return;
    }
    el.contentEditable = 'true';
    this.activeEl = 'editable';
  }

  focusNextElement(el, step = 1) {
    this.focusableElements = document.querySelectorAll('[tabindex]');
    const index = Array.from(this.focusableElements).indexOf(el);
    let nextElement;
    if (index + step < 3) {
      return;
    }
    if (index > -1) {
      window.getSelection().removeAllRanges();
      nextElement =
        this.focusableElements[index + step] || this.focusableElements[index];

      if (index) {
        el.contentEditable = 'false';
      }

      this.activeEl = nextElement;
    } else {
      this.focusableElements = document.querySelectorAll('.table td.name');

      nextElement = this.focusableElements[0];
    }
    // console.log(nextElement);
    // window.localStorage.setItem("focus", nextElement);
    nextElement.focus();
    return nextElement;
  }

  // maintain scroll position by tab idx
  mousewheel(ev: Event) {
    // console.log(this.el.nativeElement.offsetParent.firstChild);
    // console.log(this.el.nativeElement.firstChild.scrollTop);
    const scrollPos = this.el.nativeElement.offsetParent.firstChild.scrollTop;
    this.dat.tabScrollPos[this.tabIdx] = scrollPos;
  }

  undoValue() {
    const item = this.history.pop();

    let idx: any;
    if (!item) {
      return;
    }
    if (item.delPosition) {
      // delete
      idx = item.delPosition;
      delete item.delPosition;
      this.dataList.splice(idx, 0, item);
    }
    if (item.prev > -1) {
      // moved
      moveItemInArray(this.dataList, item.curr, item.prev);
    } else {
      // edited value
      idx = this.dataList.filter(itm => itm.id == item.id)[0];
      idx = this.dataList.indexOf(idx);
      // console.log(this.dataList[idx]);
      this.dataList[idx] = item;
    }

    // console.log(item);

    this.dat.fStore();
    this.gridInit();
  }
}
