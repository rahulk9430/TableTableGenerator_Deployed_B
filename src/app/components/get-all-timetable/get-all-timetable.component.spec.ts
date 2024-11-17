import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllTimetableComponent } from './get-all-timetable.component';

describe('GetAllTimetableComponent', () => {
  let component: GetAllTimetableComponent;
  let fixture: ComponentFixture<GetAllTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllTimetableComponent]
    });
    fixture = TestBed.createComponent(GetAllTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
