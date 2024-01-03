import { Course } from '@app/models/course.model';

import * as CoursesActions from './courses.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  courses: [],
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = (
  state: CoursesState | undefined,
  action: Action
): CoursesState => reduce(state, action);

const reduce = createReducer(
  initialState,
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesFail, (state) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: 'Error loading courses',
  })),
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseFail, (state) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: 'Error loading course',
  })),
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isSearchState: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state) => ({
    ...state,
    isSearchState: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state) => ({
    ...state,
    isSearchState: false,
    errorMessage: 'Error searching courses',
  })),
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state) => ({
    ...state,
    errorMessage: 'Error deleting course',
  })),
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseFail, (state) => ({
    ...state,
    errorMessage: 'Error editing course',
  })),
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseFail, (state) => ({
    ...state,
    errorMessage: 'Error creating course',
  }))
);
