import { ActionReducerMap } from '@ngrx/store';
import {
  CoursesState,
  coursesFeatureKey,
  coursesReducer,
} from './courses/courses.reducer';

interface State {
  [coursesFeatureKey]: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  [coursesFeatureKey]: coursesReducer,
};

export const effects = [];
