import { Course, CourseRequest } from '@app/models/course.model';
import { createAction, props } from '@ngrx/store';

export const requestAllCourses = createAction('[Courses] Request All Courses');
export const requestAllCoursesSuccess = createAction(
  '[Courses] Request All Courses Success',
  props<{ courses: Course[] }>()
);
export const requestAllCoursesFail = createAction(
  '[Courses] Request All Courses Fail'
);

export const requestSingleCourse = createAction(
  '[Courses] Request Single Course',
  props<{ id: string }>()
);
export const requestSingleCourseSuccess = createAction(
  '[Courses] Request Single Course Success',
  props<{ course: Course }>()
);
export const requestSingleCourseFail = createAction(
  '[Courses] Request Single Course Fail'
);

export const requestFilteredCourses = createAction(
  '[Courses] Request Filtered Courses',
  props<{ searchValue: string }>()
);
export const requestFilteredCoursesSuccess = createAction(
  '[Courses] Request Filtered Courses Success',
  props<{ courses: Course[] }>()
);
export const requestFilteredCoursesFail = createAction(
  '[Courses] Request Filtered Courses Fail'
);

export const requestDeleteCourse = createAction(
  '[Courses] Request Delete Course',
  props<{ id: string }>()
);
export const requestDeleteCourseSuccess = createAction(
  '[Courses] Request Delete Course Success'
);
export const requestDeleteCourseFail = createAction(
  '[Courses] Request Delete Course Fail'
);

export const requestEditCourse = createAction(
  '[Courses] Request Edit Course',
  props<{ id: string; body: CourseRequest }>()
);
export const requestEditCourseSuccess = createAction(
  '[Courses] Request Edit Course Success'
);
export const requestEditCourseFail = createAction(
  '[Courses] Request Edit Course Fail'
);

export const requestCreateCourse = createAction(
  '[Courses] Request Create Course',
  props<{ body: CourseRequest }>()
);
export const requestCreateCourseSuccess = createAction(
  '[Courses] Request Create Course Success'
);
export const requestCreateCourseFail = createAction(
  '[Courses] Request Create Course Fail'
);
