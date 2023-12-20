import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '@app/shared/components';

const routes: Routes = [
  { path: 'add', component: CourseFormComponent },
  { path: ':id', component: CourseFormComponent },
  { path: 'edit/:id', component: CourseFormComponent },
  {
    path: '',
    component: CoursesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
