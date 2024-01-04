import { Component, OnInit } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Observable } from 'rxjs';
import { Course } from '@app/models/course.model';
import { AuthService } from '@app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = this.coursesStore.courses$;
  searchCourses$: Observable<Course[]> = this.coursesStore.searchCourses$;
  userName$: Observable<string | null> = this.userStore.name$;
  isAuthorized$: Observable<boolean> = this.authService.isAuthorized$;
  isAdmin$: Observable<boolean> = this.userStore.isAdmin$;
  modalShown: boolean = false;
  modalCourse: Course | null = null;

  constructor(
    private coursesStore: CoursesStoreService,
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.userStore.getUser().subscribe();
    this.coursesStore.getAll().subscribe();
  }

  onSearch(searchTerm: string) {
    console.log(searchTerm);
    this.coursesStore.searchCourses(searchTerm).subscribe();
  }

  onLogout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }

  onDeleteCourse(course: Course) {
    this.modalShown = true;
    this.modalCourse = course;
  }

  modalAction(result: boolean) {
    if (result && this.modalCourse) {
      this.coursesStore.deleteCourse(this.modalCourse.id).subscribe();
    }
    this.modalShown = false;
    this.modalCourse = null;
  }

  onEditCourse(course: Course) {
    this.router.navigate(['/course', 'edit', course.id]);
  }
}
