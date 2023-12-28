import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { Course, CourseRequest } from '@app/models/course.model';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private searchCourses$$ = new BehaviorSubject<Course[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  courses$ = this.courses$$.asObservable();
  searchCourses$ = this.searchCourses$$.asObservable();
  isLoading$ = this.isLoading$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      tap((response) => {
        this.courses$$.next(response.result);
        this.searchCourses$$.next(response.result);
        this.isLoading$$.next(false);
      })
    );
  }

  createCourse(course: CourseRequest) {
    return this.coursesService
      .createCourse(course)
      .pipe(tap(() => this.getAll().subscribe()));
  }

  getCourse(id: string) {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: CourseRequest) {
    return this.coursesService
      .editCourse(id, course)
      .pipe(tap(() => this.getAll().subscribe()));
  }

  deleteCourse(id: string) {
    return this.coursesService
      .deleteCourse(id)
      .pipe(tap(() => this.getAll().subscribe()));
  }

  searchCourses(searchTerm: string) {
    return this.courses$.pipe(
      map((courses) =>
        courses.filter((course) =>
          course.title
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        )
      ),
      tap((courses) => this.searchCourses$$.next(courses))
    );
  }
}
