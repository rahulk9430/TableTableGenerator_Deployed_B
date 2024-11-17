import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimetableComponent } from './update-timetable.component';

describe('UpdateTimetableComponent', () => {
  let component: UpdateTimetableComponent;
  let fixture: ComponentFixture<UpdateTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTimetableComponent]
    });
    fixture = TestBed.createComponent(UpdateTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
