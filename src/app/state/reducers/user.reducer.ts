import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../shared/models/user';
import {
  registerUser,
  loginUserSuccess,
  loginUserFailure,
} from '../actions/user.actions';

export interface UserState {
  users: IUser[];
  loggedInUser: IUser | null;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(registerUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    error: null,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    loggedInUser: null,
    error,
  }))
);
