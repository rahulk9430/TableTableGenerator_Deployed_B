import { Component } from '@angular/core';
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent  {
  timetable: any[] = [];
  subjectName: string = '';
  semesterName: string = '';
  teacherName: string = '';
  day: string = '';
  time: string = '';

  displayedColumns: string[] = ['subjectName', 'teacherName', 'day', 'time', 'classroom', 'semesterName'];

  

  constructor(private timetableService: TimetableService) {}

  searchTimetable() {
    if (this.subjectName) {
      this.timetableService.getBySubject(this.subjectName).subscribe(data => {
        this.timetable = data;
      });
    } else if (this.semesterName) {
      this.timetableService.getBySemester(this.semesterName).subscribe(data => {
        this.timetable = data;
      });
    } else if (this.teacherName) {
      this.timetableService.getByTeacher(this.teacherName).subscribe(data => {
        this.timetable = data;
      });
    } else if (this.day && this.time) {
      this.timetableService.getByDayTime(this.day, this.time).subscribe(data => {
        this.timetable = data;
      });
    } else {
      this.timetableService.searchTimeTable(
        this.teacherName, 
        this.subjectName, 
        this.semesterName, 
        this.day, 
        this.time
      ).subscribe(data => {
        this.timetable = data;
      });
    }
  }
}
