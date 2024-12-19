import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../shared/models/user';
import { registerUser } from '../actions/user.actions';

export interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(registerUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  }))
);
