import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSheetComponent } from './user-sheet.component';

describe('UserSheetComponent', () => {
  let component: UserSheetComponent;
  let fixture: ComponentFixture<UserSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
