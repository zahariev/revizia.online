import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsRevSheetComponent } from './tabs-rev-sheet.component';

describe('TabsRevSheetComponent', () => {
  let component: TabsRevSheetComponent;
  let fixture: ComponentFixture<TabsRevSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRevSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRevSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
