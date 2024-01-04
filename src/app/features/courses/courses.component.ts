import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@app/models/course.model';
import { AuthService } from '@app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  allCourses$ = this.coursesStateFacade.allCourses$;
  courses$ = this.coursesStateFacade.courses$;
  isSearchingState$ = this.coursesStateFacade.isSearchingState$;
  userName$: Observable<string | null> = this.userStore.name$;
  isAuthorized$: Observable<boolean> = this.authService.isAuthorized$;
  isAdmin$: Observable<boolean> = this.userStore.isAdmin$;
  modalShown: boolean = false;
  modalCourse: Course | null = null;

  constructor(
    public coursesStateFacade: CoursesStateFacade,
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.coursesStateFacade.getAllCourses();
    this.userStore.getUser().subscribe();
  }

  onSearch(searchTerm: string) {
    this.coursesStateFacade.getFilteredCourses(searchTerm);
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
      this.coursesStateFacade.deleteCourse(this.modalCourse.id);
    }
    this.modalShown = false;
    this.modalCourse = null;
  }

  onEditCourse(course: Course) {
    this.router.navigate(['/course', 'edit', course.id]);
  }
}
