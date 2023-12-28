import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AllCoursesResponse,
  CourseRequest,
  CourseResponse,
} from '@app/models/course.model';
import { catchError, map } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlingService
  ) {}

  coursesUrl = environment.apiUrl + '/courses';

  getAll() {
    return this.http.get<AllCoursesResponse>(`${this.coursesUrl}/all`).pipe(
      map((response) => this.formatDates(response)),
      catchError(this.errorService.handleError)
    );
  }

  createCourse(course: CourseRequest) {
    return this.http
      .post(`${this.coursesUrl}/add`, course)
      .pipe(catchError(this.errorService.handleError));
  }

  getCourse(id: string) {
    return this.http
      .get<CourseResponse>(`${this.coursesUrl}/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  editCourse(id: string, course: CourseRequest) {
    return this.http
      .put(`${this.coursesUrl}/${id}`, course)
      .pipe(catchError(this.errorService.handleError));
  }

  deleteCourse(id: string) {
    return this.http
      .delete(`${this.coursesUrl}/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  private formatDates(coursesResponse: AllCoursesResponse) {
    const formattedCourses = coursesResponse.result.map((course) => {
      const responseDateString = course.creationDate;
      const [day, month, year] = responseDateString.split('/');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return { ...course, creationDate: date };
    });
    const formattedCoursesResponse = {
      ...coursesResponse,
      result: formattedCourses,
    };
    return formattedCoursesResponse;
  }
}
