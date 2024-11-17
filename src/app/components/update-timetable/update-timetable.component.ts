import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimetableService } from 'src/app/service/timetable.service';
import { TimeTable } from 'src/app/models/time-table.model';

@Component({
  selector: 'app-update-timetable',
  templateUrl: './update-timetable.component.html',
  styleUrls: ['./update-timetable.component.css']
})
export class UpdateTimetableComponent implements OnInit {

  // Properties to store values from queryParams
  subjectName: string = '';
  teacherName: string = '';
  classroom: string = '';
  semesterName: string = '';
  day: string = '';
  time: string = '';
  id: number = 0; // Add an id to uniquely identify the timetable entry

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timetableService: TimetableService // Inject the service
  ) {}

  ngOnInit(): void {
    // Get query parameters from the route
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || 0; // Ensure we get the correct id from params
      this.day = params['day'] || ''; // Default to empty string if undefined
      this.semesterName = params['semester'] || '';
      this.time = params['time'] || '';
      this.subjectName = params['subject'] || ''; // Set the subject if available
      this.teacherName = params['teacher'] || ''; // Set the teacher name if available
      this.classroom = params['classroom'] || ''; // Set the classroom if available
  
      // If time is in 24-hour format from backend, convert it to 12-hour format for matching
      if (this.time) {
        this.time = this.convertTimeToDropdownFormat(this.time);
      }
  
      // Fetch the full timetable entry if the ID is available
      if (this.id) {
        this.fetchTimetableData(this.id);
      }
    });
  }
  
  // Convert 24-hour time format to 12-hour time format for dropdown matching
  convertTimeToDropdownFormat(time: string): string {
    const timeMapping: { [key: string]: string } = {
      '10:00:00': '10:00-11:00',
      '11:00:00': '11:00-12:00',
      '12:00:00': '12:00-1:00',
      '13:00:00': '1:00-2:00',
      '14:00:00': '2:00-3:00',
      '15:00:00': '3:00-4:00',
    };
  
    // TypeScript is complaining because the key is not strictly typed, so we cast the time to a key of the mapping.
    return timeMapping[time as keyof typeof timeMapping] || time;
  }
  

  // Fetch the timetable data by ID
  fetchTimetableData(id: number): void {
    this.timetableService.getTimetableById(id).subscribe(
      (timetable: TimeTable) => {
        if (timetable) {
          // Populate the form fields with the fetched data
          this.subjectName = timetable.subjectName;
          this.teacherName = timetable.teacherName;
          this.classroom = timetable.classroom;
          this.semesterName = timetable.semesterName;
          this.day = timetable.day;
          this.time = timetable.time;
        } else {
          console.error('Timetable not found');
        }
      },
      (error) => {
        console.error('Error fetching timetable data:', error);
      }
    );
  }

  // Method to handle the form submission (update timetable entry)
  updateTable(): void {
    const updatedTimeTable: TimeTable = {
      id: this.id,
      subjectName: this.subjectName,
      teacherName: this.teacherName,
      semesterName: this.semesterName,
      day: this.day,
      time: this.time,
      classroom: this.classroom,
      duration: 60 // You can calculate this or set it manually
    };

    this.timetableService.updateTimeTable(this.id, updatedTimeTable).subscribe(
      (response) => {
        console.log('Timetable updated successfully:', response);
        this.router.navigate(['/get-all-timetable']);
      },
      (error) => {
        console.error('Error updating timetable:', error);
      }
    );
  }
}
