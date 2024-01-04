import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./features/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./features/course/course.module').then((m) => m.CourseModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', redirectTo: 'courses' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
