import { createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/models/user';

export const registerUser = createAction(
  '[User] Register User',
  props<{ user: IUser }>()
);
