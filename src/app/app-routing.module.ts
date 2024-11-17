import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './components/timetable/timetable.component';
import { CreateTimetableComponent } from './components/create-timetable/create-timetable.component';
import { GetAllTimetableComponent } from './components/get-all-timetable/get-all-timetable.component';
import { UpdateTimetableComponent } from './components/update-timetable/update-timetable.component';

const routes: Routes = [
  { path: '', component: GetAllTimetableComponent },
  { path: 'create', component: CreateTimetableComponent },
  { path: 'get-all-timetable', component: GetAllTimetableComponent },
  { path: 'update', component: UpdateTimetableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
