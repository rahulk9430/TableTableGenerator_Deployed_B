import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimetableService } from 'src/app/service/timetable.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-get-all-timetable',
  templateUrl: './get-all-timetable.component.html',
  styleUrls: ['./get-all-timetable.component.css']
})
export class GetAllTimetableComponent implements OnInit {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  times: string[] = [
    '10:00-11:00',
    '11:00-12:00',
    '12:00-1:00',
    '1:00-2:00',
    '2:00-3:00',
    '3:00-4:00'
  ];
  timetableGrid: any = {}; // Holds the timetable data
  semesters!: any[];
  selectedDay: string = ''; // Holds selected day for filter
  selectedTime: string = ''; // Holds selected time for filter

  constructor(private timetableService: TimetableService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchTimetables();
  }

  printTimetable() {
    const data = document.getElementById('timetable-table'); // Get the timetable table by ID
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
  
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Timetable.pdf'); // Save as a PDF
      });
    } else {
      console.error('Timetable element not found for printing.');
    }
  }
  

  // Fetch timetables from the backend
  fetchTimetables() {
    this.timetableService.getAllTimetables().subscribe(
      (response: any[]) => {
        if (response && response.length > 0) {
          this.semesters = [...new Set(response.map((timetable) => timetable.semesterName))];
          this.buildTimetableGrid(response);
        } else {
          console.error('No timetables found');
        }
      },
      (error) => {
        console.error('Error fetching timetables:', error);
      }
    );
  }

  buildTimetableGrid(timetables: any[]) {
    const timeMapping: { [key: string]: string } = {
      '10:00:00': '10:00-11:00',
      '11:00:00': '11:00-12:00',
      '12:00:00': '12:00-1:00',
      '13:00:00': '1:00-2:00',
      '14:00:00': '2:00-3:00',
      '15:00:00': '3:00-4:00'
    };

    // Initialize timetable grid
    this.days.forEach((day) => {
      this.timetableGrid[day] = {};
      this.semesters.forEach((semester) => {
        this.timetableGrid[day][semester] = {};
        this.times.forEach((time) => {
          // Find the corresponding timetable entry
          const entry = timetables.find(
            (t) =>
              t.day.toUpperCase() === day.toUpperCase() &&
              timeMapping[t.time] === time &&
              t.semesterName === semester
          );

          // Assign subject name or leave it blank
          this.timetableGrid[day][semester][time] = entry ? { 
            subjectName: entry.subjectName,
            teacherName: entry.teacherName,
            classroom: entry.classroom,
            id: entry.id  // Store the timetable ID
          } : null;
        });
      });
    });
  }

  // Delete timetable entry
  deleteTimetableEntry(day: string, semester: string, time: string) {
    const entry = this.findTimetableEntry(day, semester, time);
  
    if (entry) {
      if (confirm('Are you sure you want to delete this timetable entry?')) {
        this.timetableService.deleteTimetable(entry.id).subscribe(
          (response: any) => {
            // Treat null, undefined, or empty response as a successful deletion
            if (response === null || response === '' || response === undefined) {
              // Remove the entry from the timetableGrid
              delete this.timetableGrid[day][semester][time];
  
              // Update the UI
              this.cdr.detectChanges();
  
              console.log('Timetable entry deleted successfully');
            } else {
              console.error('Failed to delete timetable entry. Unexpected response:', response);
            }
          },
          (error) => {
            console.error('Error deleting timetable entry:', error);
          }
        );
      }
    }
  }
  
  


  // Find timetable entry based on day, semester, and time
  findTimetableEntry(day: string, semester: string, time: string) {
    return this.timetableGrid[day]?.[semester]?.[time] || null;
  }

  // Reset filters
  resetFilters() {
    this.selectedDay = '';
    this.selectedTime = '';
  }

  // Filter timetables based on selected filters
  filterTimetable() {
    const filteredData: any = {};

    if (this.selectedDay || this.selectedTime) {
      for (const day of this.days) {
        if (this.selectedDay && day !== this.selectedDay) {
          continue;
        }

        filteredData[day] = {};
        for (const semester of this.semesters) {
          filteredData[day][semester] = {};
          for (const time of this.times) {
            if (this.selectedTime && time !== this.selectedTime) {
              continue;
            }
            filteredData[day][semester][time] = this.timetableGrid[day]?.[semester]?.[time] || '';
          }
        }
      }
    } else {
      Object.assign(filteredData, this.timetableGrid);
    }

    return filteredData;
  }

  // Navigate to the update page when the timetable entry is clicked
  navigateToUpdatePage(day: string, semester: string, time: string) {
    const timetableEntry = this.findTimetableEntry(day, semester, time);
    
    if (timetableEntry) {
      this.router.navigate(['/update'], {
        queryParams: { 
          id: timetableEntry.id, 
          day, 
          semester: timetableEntry.semesterName, 
          time: timetableEntry.time, 
          subject: timetableEntry.subjectName,
          teacher: timetableEntry.teacherName,
          classroom: timetableEntry.classroom 
        }
      });
    }
  }
}
