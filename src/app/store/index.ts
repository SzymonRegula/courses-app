import { ActionReducerMap } from '@ngrx/store';
import {
  CoursesState,
  coursesFeatureKey,
  coursesReducer,
} from './courses/courses.reducer';
import { CoursesEffects } from './courses/courses.effects';

interface State {
  [coursesFeatureKey]: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  [coursesFeatureKey]: coursesReducer,
};

export const effects = [CoursesEffects];
