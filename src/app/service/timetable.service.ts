import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeTable } from '../models/time-table.model';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  private apiUrl = 'http://localhost:8081/api/timetable';

  constructor(private http: HttpClient) {}

  createTimetable(timetableEntry: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, timetableEntry);
  }
  
  getAllTimetables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  updateTimeTable(id: number, timeTable: TimeTable): Observable<TimeTable> {
    return this.http.put<TimeTable>(`${this.apiUrl}/${id}`, timeTable);
  }

  getTimetableById(id: number): Observable<TimeTable> {
    return this.http.get<TimeTable>(`${this.apiUrl}/${id}`);
  }

  deleteTimetable(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  

  // Fetch timetable by subject name
  getBySubject(subjectName: string): Observable<any> {
    const params = new HttpParams().set('subjectName', subjectName);
    return this.http.get(`${this.apiUrl}/by-subject`, { params });
  }

  // Fetch timetable by semester name
  getBySemester(semesterName: string): Observable<any> {
    const params = new HttpParams().set('semesterName', semesterName);
    return this.http.get(`${this.apiUrl}/by-semester`, { params });
  }

  // Fetch timetable by teacher name
  getByTeacher(teacherName: string): Observable<any> {
    const params = new HttpParams().set('teacherName', teacherName);
    return this.http.get(`${this.apiUrl}/by-teacher`, { params });
  }

  // Fetch timetable by day and time
  getByDayTime(day: string, time: string): Observable<any> {
    const params = new HttpParams().set('day', day).set('time', time);
    return this.http.get(`${this.apiUrl}/by-day-time`, { params });
  }

  // General search with multiple filters
  searchTimeTable(
    teacherName: string,
    subjectName: string,
    semesterName: string,
    day: string,
    time: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('teacherName', teacherName)
      .set('subjectName', subjectName)
      .set('semesterName', semesterName)
      .set('day', day)
      .set('time', time);

    return this.http.get(`${this.apiUrl}/search`, { params });
  }
}
