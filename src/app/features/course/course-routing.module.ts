import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
  { path: 'add', component: CourseComponent, canActivate: [AdminGuard] },
  { path: ':id', component: CourseComponent },
  { path: 'edit/:id', component: CourseComponent, canActivate: [AdminGuard] },
  {
    path: '',
    component: CourseComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
