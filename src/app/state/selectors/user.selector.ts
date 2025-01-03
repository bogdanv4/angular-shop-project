import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectLoggedInUser = createSelector(
  selectUserState,
  (state) => state.loggedInUser
);

export const selectLoginError = createSelector(
  selectUserState,
  (state) => state.error
);
