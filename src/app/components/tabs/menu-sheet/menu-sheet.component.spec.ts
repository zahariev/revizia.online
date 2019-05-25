import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSheetComponent } from './menu-sheet.component';

describe('MenuSheetComponent', () => {
  let component: MenuSheetComponent;
  let fixture: ComponentFixture<MenuSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
