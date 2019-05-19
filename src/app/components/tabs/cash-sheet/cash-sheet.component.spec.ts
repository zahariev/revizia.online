import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSheetComponent } from './cash-sheet.component';

describe('CashSheetComponent', () => {
  let component: CashSheetComponent;
  let fixture: ComponentFixture<CashSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
