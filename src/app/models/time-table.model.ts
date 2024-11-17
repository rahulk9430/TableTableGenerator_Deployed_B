export interface TimeTable {
  id: number;
  teacherName: string;
  subjectName: string;
  semesterName: string;
  day: string;         // e.g., "MONDAY", "TUESDAY", etc.
  time: string;        // Time in "HH:mm" format
  classroom: string;
  duration: number;    // Duration in minutes
}
