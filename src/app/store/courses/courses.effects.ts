import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';

import * as CoursesActions from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((response) =>
            CoursesActions.requestAllCoursesSuccess({
              courses: response.result,
            })
          ),
          catchError(() => of(CoursesActions.requestAllCoursesFail()))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
      map(([action, courses]) => {
        const searchValue = action.searchValue;
        const filteredCourses = courses.filter((course) =>
          course.title
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        );
        return CoursesActions.requestFilteredCoursesSuccess({
          courses: filteredCourses,
        });
      }),
      catchError(() => of(CoursesActions.requestFilteredCoursesFail()))
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((response) =>
            CoursesActions.requestSingleCourseSuccess({
              course: response.result,
            })
          ),
          catchError(() => of(CoursesActions.requestSingleCourseFail()))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError(() => of(CoursesActions.requestDeleteCourseFail()))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.body).pipe(
          map(() => CoursesActions.requestEditCourseSuccess()),
          catchError(() => of(CoursesActions.requestEditCourseFail()))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.body).pipe(
          map(() => CoursesActions.requestCreateCourseSuccess()),
          catchError(() => of(CoursesActions.requestCreateCourseFail()))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        tap(() => this.router.navigate(['/courses']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade
  ) {}
}
