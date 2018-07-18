import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExcersiceComponent } from './edit-excersice.component';

describe('EditExcersiceComponent', () => {
  let component: EditExcersiceComponent;
  let fixture: ComponentFixture<EditExcersiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExcersiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExcersiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
