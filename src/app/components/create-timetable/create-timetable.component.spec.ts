import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimetableComponent } from './create-timetable.component';

describe('CreateTimetableComponent', () => {
  let component: CreateTimetableComponent;
  let fixture: ComponentFixture<CreateTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTimetableComponent]
    });
    fixture = TestBed.createComponent(CreateTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
