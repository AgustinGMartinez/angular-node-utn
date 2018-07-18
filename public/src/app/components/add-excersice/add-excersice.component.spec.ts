import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcersiceComponent } from './add-excersice.component';

describe('AddExcersiceComponent', () => {
  let component: AddExcersiceComponent;
  let fixture: ComponentFixture<AddExcersiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExcersiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExcersiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
