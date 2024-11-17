import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-create-timetable',
  templateUrl: './create-timetable.component.html',
  styleUrls: ['./create-timetable.component.css'],
})
export class CreateTimetableComponent {
  subjectName: string = '';
  teacherName: string = '';
  day: string = '';
  time: string = ''; // 12-hour format time
  classroom: string = '';
  semesterName: string = '';

  constructor(
    private timetableService: TimetableService,
    private router: Router, // Inject Router
    private datePipe: DatePipe
  ) {}

  // Convert time to 24-hour format before submitting
  convertTo24HourFormat(time: string): string {
    // Convert the time to 24-hour format using DatePipe
    return this.datePipe.transform(time, 'HH:mm')!;
  }

   // Convert time ranges to "HH:mm:ss" format
   private timeMapping: { [key: string]: string } = {
    '10:00-11:00': '10:00:00',
    '11:00-12:00': '11:00:00',
    '12:00-1:00': '12:00:00',
    '13:00-14:00': '13:00:00',
    '14:00-15:00': '14:00:00',
    '15:00-16:00': '15:00:00',
  };

  // Create timetable entry
  createTimetable() {
    // Convert the time to 24-hour format before sending to backend
    const transformedTime = this.timeMapping[this.time];

    const timetableEntry = {
      teacherName: this.teacherName,
      subjectName: this.subjectName,
      semesterName: this.semesterName,
      time: transformedTime,
      day: this.day,
      classroom: this.classroom,
    };

    this.timetableService.createTimetable(timetableEntry).subscribe(
      (response) => {
        console.log('Timetable created successfully:', response);
        alert('Timetable created successfully!');
        this.clearForm();

        // Navigate to the Get All Timetable page after successful creation
        this.router.navigate(['/get-all-timetable']);  // Replace with the actual path for your page
      },
      (error) => {
        console.error('Error creating timetable:', error);
        alert('There was an error creating the timetable.');
      }
    );
  }

  // Clear the form fields
  clearForm() {
    this.subjectName = '';
    this.teacherName = '';
    this.day = '';
    this.time = '';
    this.classroom = '';
    this.semesterName = '';
  }
}
