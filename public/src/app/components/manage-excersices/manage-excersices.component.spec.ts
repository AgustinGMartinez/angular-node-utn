import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExcersicesComponent } from './manage-excersices.component';

describe('ManageExcersicesComponent', () => {
  let component: ManageExcersicesComponent;
  let fixture: ComponentFixture<ManageExcersicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExcersicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExcersicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
