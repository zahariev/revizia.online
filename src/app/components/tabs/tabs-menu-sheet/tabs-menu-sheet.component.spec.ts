import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMenuSheetComponent } from './tabs-menu-sheet.component';

describe('TabsMenuSheetComponent', () => {
  let component: TabsMenuSheetComponent;
  let fixture: ComponentFixture<TabsMenuSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsMenuSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsMenuSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
