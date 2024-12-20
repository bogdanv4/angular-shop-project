import { createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/models/user';

export const registerUser = createAction(
  '[User] Register User',
  props<{ user: IUser }>()
);

export const loginUser = createAction(
  '[User] Login User',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[User] Login Success',
  props<{ user: IUser }>()
);

export const loginUserFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);
