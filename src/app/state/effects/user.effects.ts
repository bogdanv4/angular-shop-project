import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  registerUser,
} from '../actions/user.actions';
import { of, switchMap, tap } from 'rxjs';
import { IUser } from '../../shared/models/user';

@Injectable()
export class UserEffects {
  private actions$: Actions = inject(Actions);

  saveUserToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerUser),
        tap((action) => {
          const users = JSON.parse(
            localStorage.getItem('users') || '[]'
          ) as IUser[];
          users.push(action.user);
          localStorage.setItem('users', JSON.stringify(users));
        })
      ),
    { dispatch: false }
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) => {
        const users = JSON.parse(
          localStorage.getItem('users') || '[]'
        ) as IUser[];
        const foundUser = users.find(
          (user) =>
            user.email === action.email && user.password === action.password
        );

        if (foundUser) {
          return of(loginUserSuccess({ user: foundUser }));
        } else {
          return of(loginUserFailure({ error: 'Invalid email or password' }));
        }
      })
    )
  );
}
