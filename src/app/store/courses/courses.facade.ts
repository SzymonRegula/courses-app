import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import {
  getAllCourses,
  getCourse,
  getCourses,
  getErrorMessage,
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector,
} from './courses.selectors';
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilteredCourses,
  requestSingleCourse,
} from './courses.actions';
import { CourseRequest } from '@app/models/course.model';

@Injectable({ providedIn: 'root' })
export class CoursesStateFacade {
  isAllCoursesLoading$ = this.store.pipe(select(isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(
    select(isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(select(isSearchingStateSelector));
  courses$ = this.store.pipe(select(getCourses));
  allCourses$ = this.store.pipe(select(getAllCourses));
  course$ = this.store.pipe(select(getCourse));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(requestFilteredCourses({ searchValue }));
  }

  editCourse(id: string, body: CourseRequest) {
    this.store.dispatch(requestEditCourse({ id, body }));
  }

  createCourse(body: CourseRequest) {
    this.store.dispatch(requestCreateCourse({ body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
